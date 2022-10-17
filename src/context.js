import { createContext, useContext, useReducer } from "react";

export const getId = () => Math.floor(Math.random() * 100) + Date.now() + "";

export const createNode = ({ id, list }) => {
  return {
    id: id || getId(),
    type: list && list.length ? "group" : "field",
    list: list || null,
    value: list && list.length ? null : "",
  };
};

export const createInitialContext = (config) => {
  let ctx = {
    nodes: {},
  };
  const rootList = [];
  config.steps.forEach((step) => {
    const list = [];
    step.fields.forEach((field) => {
      let id = getId();
      list.push(id);
      ctx.nodes = {
        ...ctx.nodes,
        [id]: createNode({ id }),
      };
    });
    let id = getId();
    rootList.push(id);
    ctx.nodes = {
      ...ctx.nodes,
      [id]: createNode({ id, list }),
    };
  });

  const id = getId();
  ctx.nodes = {
    ...ctx.nodes,
    [id]: createNode({ id, list: rootList }),
  };
  ctx.rootNodeId = id;
  ctx.currentStepIdx = 0;

  return ctx;
};

export const AsstContext = createContext();
export const useAsstContext = () => useContext(AsstContext);

const createCompoundField = (state, action) => {
  const list = [];
  let nodes = {};

  action.fields.forEach(() => {
    const id = getId();
    nodes = {
      ...nodes,
      [id]: createNode({ id }),
    };
    list.push(id);
  });
  const id = getId();
  nodes[id] = createNode({ id, list });

  return {
    ...state,
    nodes: {
      ...state.nodes,
      ...nodes,
      [action.nodeId]: {
        ...state.nodes[action.nodeId],
        list: (state.nodes[action.nodeId].list || []).concat(id),
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
      return { ...state, currentStepId: action.currentStepId };
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
}
