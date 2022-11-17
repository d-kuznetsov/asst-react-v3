import { createContext, useContext, useReducer } from "react";
import uniqid from "uniqid";
import { getFieldDefaultValue, FIELD_TYPES } from "./field-types";

export const getId = () => uniqid();

const asstCtxRef = {
  value: null,
};

const getParentHash = (nodeId, asstCtx) => {
  const { parentId } = asstCtx.nodes[nodeId];
  const hash = {};
  asstCtx.nodes[parentId].children.forEach((childId) => {
    const { name, value } = asstCtx.nodes[childId];
    hash[name] = value;
  });
  return hash;
};

const getHash = (nodeId, asstCtx) => {
  const hash = {};
  asstCtx.nodes[nodeId].children.forEach((childId) => {
    const { name, value } = asstCtx.nodes[childId];
    hash[name] = value;
  });
  return hash;
};

const getSet = (nodeId, asstCtx) => {
  return asstCtx.nodes[nodeId].children.map((childId) => {
    return asstCtx.nodes[childId].value;
  });
};

const wrapNode = (node, config = null) => {
  return new Proxy(node, {
    get(node, key) {
      if (key === "error" && (node.children || config.validate)) {
        if (node.children) {
          return node.children.some((childId) => {
            return asstCtxRef.value.nodes[childId].error;
          });
        }
        const parentHash = getParentHash(node.id, asstCtxRef.value);
        return config.validate(node.value, parentHash, asstCtxRef.value);
      } else if (key === "hidden" && config?.hide) {
        const parentHash = getParentHash(node.id, asstCtxRef.value);
        return config.hide(node.value, parentHash, asstCtxRef.value);
      } else if (key === "hash") {
        return getHash(node.id, asstCtxRef.value);
      } else if (key === "config" && config) {
        return config;
      } else if (key === "value") {
        if (node.type === "map") {
          return getHash(node.id, asstCtxRef.value);
        } else if (node.type === "set") {
          return getSet(node.id, asstCtxRef.value);
        }
        return node.value;
      }
      return node[key];
    },
  });
};

export const createNode = ({
  id,
  children = null,
  parentId = null,
  config = null,
  type,
}) => {
  const node = {
    id: id || getId(),
    parentId,
    children,
    value: children?.length ? null : getFieldDefaultValue(config.type),
    name: config?.id || null,
    type,
  };

  return wrapNode(node, config);
};

const createCompoundFieldNodes = (ctx, compoundField, stepId) => {
  const listId = getId();
  const listItemId = getId();
  const listItemChildren = [];

  compoundField.fields.forEach((fieldConfig) => {
    let fieldId = getId();
    listItemChildren.push(fieldId);
    ctx.nodes = {
      ...ctx.nodes,
      [fieldId]: createNode({
        id: fieldId,
        parentId: listItemId,
        config: fieldConfig,
        ctx,
        type: "value",
      }),
    };
  });

  ctx.nodes = {
    ...ctx.nodes,
    [listItemId]: createNode({
      id: listItemId,
      parentId: listId,
      children: listItemChildren,
      // ??? config
      ctx,
      type: "map",
    }),
    [listId]: createNode({
      id: listId,
      parentId: stepId,
      children: [listItemId],
      config: compoundField,
      ctx,
      type: "set",
    }),
  };

  return listId;
};

export const createInitialContext = (config) => {
  let ctx = {
    nodes: {},
  };

  const rootId = getId();
  const rootList = [];
  config.steps.forEach((step) => {
    const children = [];
    let stepId = getId();

    if (step.type === "STEP_TYPE_OVERVIEW" || step.type === "STEP_TYPE_DONE") {
      ctx.nodes = {
        ...ctx.nodes,
        [stepId]: createNode({
          id: stepId,
          config: step,
          type: "auxiliary",
        }),
      };
      rootList.push(stepId);
      return;
    }

    step.fields.forEach((field) => {
      if (field.options?.atLeastOne) {
        const compoundFieldId = createCompoundFieldNodes(ctx, field, stepId);
        children.push(compoundFieldId);
      } else {
        const fieldId = getId();
        children.push(fieldId);
        if (field.type === FIELD_TYPES.COMPOUND) {
          ctx.nodes = {
            ...ctx.nodes,
            [fieldId]: createNode({
              id: fieldId,
              parentId: stepId,
              config: field,
              ctx,
              type: "set",
              children: [],
            }),
          };
        } else {
          ctx.nodes = {
            ...ctx.nodes,
            [fieldId]: createNode({
              id: fieldId,
              parentId: stepId,
              config: field,
              ctx,
              type: "value",
            }),
          };
        }
      }
    });

    rootList.push(stepId);
    ctx.nodes = {
      ...ctx.nodes,
      [stepId]: createNode({
        id: stepId,
        children,
        parentId: rootId,
        config: step,
        type: "map",
      }),
    };
  });

  ctx.nodes = {
    ...ctx.nodes,
    [rootId]: createNode({
      id: rootId,
      children: rootList,
      config,
      type: "set",
    }),
  };
  ctx.rootNodeId = rootId;
  ctx.currentStepId = config.steps[0].id;
  ctx.touchedStep = false;
  ctx.stepHistory = [];
  ctx.isLoading = false;

  asstCtxRef.value = ctx;
  return asstCtxRef.value;
};

export const AsstContext = createContext();
export const useAsstContext = () => useContext(AsstContext);

const createCompoundField = (state, action) => {
  const children = [];
  let nodes = {};
  const rootNode = state.nodes[action.nodeId];
  const groupId = getId();

  rootNode.config.fields.forEach((field) => {
    const id = getId();
    nodes = {
      ...nodes,
      [id]: createNode({ id, parentId: groupId, config: field, type: "value" }),
    };
    children.push(id);
  });
  nodes[groupId] = createNode({
    id: groupId,
    children,
    parentId: action.nodeId,
    type: "map",
    // config
  });
  return {
    ...state,
    nodes: {
      ...state.nodes,
      ...nodes,
      [action.nodeId]: wrapNode({
        ...state.nodes[action.nodeId],
        children: (rootNode.children || []).concat(groupId),
        config: rootNode.config,
      }),
    },
  };
};

const deleteCompoundField = (state, action) => {
  const { nodeId } = action;
  const { parentId } = state.nodes[nodeId];
  const nodesToDelete = [nodeId, ...state.nodes[nodeId].children];
  let newNodes = { ...state.nodes };
  nodesToDelete.forEach((nodeId) => {
    delete newNodes[nodeId];
  });

  newNodes = {
    ...newNodes,
    [parentId]: wrapNode({
      ...newNodes[parentId],
      children: newNodes[parentId].children.filter(
        (childId) => childId !== nodeId
      ),
    }),
  };

  return {
    ...state,
    nodes: newNodes,
  };
};

const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const SET_CURRENT_STEP_ID = "SET_CURRENT_STEP_ID";
const ADD_COMPOUND_FIELD = "ADD_COMPOUND_FIELD";
const SET_TOUCHED = "SET_TOUCHED";
const STEP_BACK = "STEP_BACK";
const DELETE_COMPOUND_FIELD = "DELETE_COMPOUND_FIELD";
const EDIT_STEP = "EDIT_STEP";
const SET_LOADING = "SET_LOADING";

export const updateContext = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_CURRENT_STEP_ID:
      newState = {
        ...state,
        currentStepId: action.stepId,
        touchedStep: false,
        stepHistory: [...state.stepHistory, state.currentStepId],
      };
      break;
    case STEP_BACK:
      newState = {
        ...state,
        currentStepId: state.stepHistory.at(-1),
        touchedStep: false,
        stepHistory: state.stepHistory.slice(0, -1),
      };
      break;
    case EDIT_STEP:
      newState = {
        ...state,
        currentStepId: action.stepId,
        touchedStep: false,
        stepHistory: state.stepHistory.slice(
          0,
          state.stepHistory.findIndex((stepId) => stepId === action.stepId)
        ),
      };
      break;
    case SET_FIELD_VALUE:
      newState = {
        ...state,
        nodes: {
          ...state.nodes,
          [action.nodeId]: wrapNode(
            {
              ...state.nodes[action.nodeId],
              value: action.value,
            },
            state.nodes[action.nodeId].config
          ),
        },
      };
      break;
    case ADD_COMPOUND_FIELD:
      newState = createCompoundField(state, action);
      break;
    case DELETE_COMPOUND_FIELD:
      newState = deleteCompoundField(state, action);
      break;
    case SET_TOUCHED:
      newState = {
        ...state,
        touchedStep: true,
      };
      break;
    case SET_LOADING:
      newState = {
        ...state,
        isLoading: action.value,
      };
      break;
    default:
      throw new Error();
  }
  asstCtxRef.value = newState;
  return asstCtxRef.value;
};

export const useAsstReducer = (config) => {
  return useReducer(updateContext, null, () => createInitialContext(config));
};
