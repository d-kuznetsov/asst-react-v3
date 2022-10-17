import { createContext, useContext, useReducer } from "react";
import uniqid from "uniqid";

export const getId = () => uniqid();

export const createNode = ({ id, list, parentId = null }) => {
  return {
    id: id || getId(),
    type: list && list.length ? "group" : "field",
    list: list || null,
    value: list && list.length ? null : "",
    parentId,
  };
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
        [fieldId]: createNode({ id: fieldId, parentId: stepId }),
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

  return ctx;
};

export const AsstContext = createContext();
export const useAsstContext = () => useContext(AsstContext);

const createCompoundField = (state, action) => {
  const list = [];
  let nodes = {};
  const groupId = getId();

  action.fields.forEach(() => {
    const id = getId();
    nodes = {
      ...nodes,
      [id]: createNode({ id, parentId: groupId }),
    };
    list.push(id);
  });
  nodes[groupId] = createNode({ id: groupId, list, parentId: action.nodeId });

  return {
    ...state,
    nodes: {
      ...state.nodes,
      ...nodes,
      [action.nodeId]: {
        ...state.nodes[action.nodeId],
        list: (state.nodes[action.nodeId].list || []).concat(groupId),
      },
    },
  };
};

const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const SET_CURRENT_STEP_ID = "SET_CURRENT_STEP_ID";
const ADD_COMPOUND_FIELD = "ADD_COMPOUND_FIELD";

export const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_STEP_ID:
      return { ...state, currentStepId: action.stepId };
    case SET_FIELD_VALUE:
      return {
        ...state,
        nodes: {
          ...state.nodes,
          [action.nodeId]: {
            ...state.nodes[action.nodeId],
            value: action.value,
          },
        },
      };
    case ADD_COMPOUND_FIELD:
      return createCompoundField(state, action);
    default:
      throw new Error();
  }
};

export const useAsstReducer = (config) => {
  return useReducer(reducer, createInitialContext(config));
};
