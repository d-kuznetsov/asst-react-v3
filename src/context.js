import { createContext, useContext, useReducer } from "react";
import uniqid from "uniqid";

export const getId = () => uniqid();

const asstState = {
  value: null,
};

const getParentCtx = (nodeId, ctx) => {
  const { parentId } = ctx.nodes[nodeId];
  const res = {};
  ctx.nodes[parentId].list.forEach((id) => {
    const { fieldId, value } = ctx.nodes[id];
    res[fieldId] = value;
  }, {});
  return res;
};

const wrapNode = (obj, config = {}) => {
  return new Proxy(obj, {
    get(obj, key) {
      if (key === "error" && config.validate) {
        console.log(config.title, "validate");
        const groupCtx = getParentCtx(obj.id, asstState.value);
        return config.validate(obj.value, groupCtx, asstState.value)
          ? "Some error"
          : "No error";
      }
      return obj[key];
    },
  });
};

export const createNode = ({ id, list, parentId = null, config = {} }) => {
  const obj = {
    id: id || getId(),
    type: list && list.length ? "group" : "field",
    list: list || null,
    value: list && list.length ? null : "",
    parentId,
    fieldId: config.id || null,
  };

  return wrapNode(obj, config);
};

export const createInitialContext = (config) => {
  let ctx = {
    nodes: {},
  };

  const rootId = getId();
  const rootList = [];
  config.steps.forEach((step) => {
    const list = [];
    let stepId = getId();

    step.fields.forEach((field) => {
      let fieldId = getId();
      list.push(fieldId);
      ctx.nodes = {
        ...ctx.nodes,
        [fieldId]: createNode({
          id: fieldId,
          parentId: stepId,
          config: field,
          ctx,
        }),
      };
    });

    rootList.push(stepId);
    ctx.nodes = {
      ...ctx.nodes,
      [stepId]: createNode({ id: stepId, list, parentId: rootId }),
    };
  });

  ctx.nodes = {
    ...ctx.nodes,
    [rootId]: createNode({ id: rootId, list: rootList }),
  };
  ctx.rootNodeId = rootId;
  ctx.currentStepId = config.steps[0].id;

  asstState.value = ctx;
  return asstState.value;
};

export const AsstContext = createContext();
export const useAsstContext = () => useContext(AsstContext);

const createCompoundField = (state, action) => {
  const list = [];
  let nodes = {};
  const groupId = getId();

  action.fields.forEach((field) => {
    const id = getId();
    nodes = {
      ...nodes,
      [id]: createNode({ id, parentId: groupId, config: field }),
    };
    list.push(id);
  });
  nodes[groupId] = createNode({ id: groupId, list, parentId: action.nodeId });

  return {
    ...state,
    nodes: {
      ...state.nodes,
      ...nodes,
      [action.nodeId]: wrapNode({
        ...state.nodes[action.nodeId],
        list: (state.nodes[action.nodeId].list || []).concat(groupId),
      }),
    },
  };
};

const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const SET_CURRENT_STEP_ID = "SET_CURRENT_STEP_ID";
const ADD_COMPOUND_FIELD = "ADD_COMPOUND_FIELD";

export const reducer = (state, action) => {
  let newState;
  switch (action.type) {
    case SET_CURRENT_STEP_ID:
      newState = { ...state, currentStepId: action.stepId };
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
            action.config
          ),
        },
      };
      break;
    case ADD_COMPOUND_FIELD:
      newState = createCompoundField(state, action);
      break;
    default:
      throw new Error();
  }
  asstState.value = newState;
  return asstState.value;
};

export const useAsstReducer = (config) => {
  return useReducer(reducer, createInitialContext(config));
};
