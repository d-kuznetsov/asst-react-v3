import { createContext, useContext, useReducer, useMemo } from "react";
import { createInitialContext, getId, createNode } from "./context-utils";

const AsstContext = createContext();

const SET_FIELD_VALUE = "SET_FIELD_VALUE";
const SET_CURRENT_STEP_ID = "SET_CURRENT_STEP_ID";
const ADD_COMPOUND_FIELD = "ADD_COMPOUND_FIELD";

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

const reducer = (state, action) => {
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

export const AsstContextProvider = ({ children, config }) => {
  const [state, dispatch] = useReducer(reducer, createInitialContext(config));
  const value = useMemo(
    () => ({
      asstState: state,
      dispatch,
    }),
    [state, dispatch]
  );

  return <AsstContext.Provider value={value}>{children}</AsstContext.Provider>;
};
