import { createContext, useContext, useReducer, useMemo } from "react";

const AsstContext = createContext();

export const useAsstContext = () => useContext(AsstContext);

const SET_CURRENT_STEP_ID = "SET_CURRENT_STEP_ID";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_STEP_ID:
      return { ...state, currentStepId: action.currentStepId };
    default:
      throw new Error();
  }
};

const createInitialArgs = (config) => {
  return {
    currentStepId: config.steps[0].id,
  };
};

export const AsstContextProvider = ({ children, config }) => {
  console.log(config);
  const [state, dispatch] = useReducer(reducer, createInitialArgs(config));
  const value = useMemo(
    () => ({
      asstState: state,
      dispatch,
    }),
    [state, dispatch]
  );

  return <AsstContext.Provider value={value}>{children}</AsstContext.Provider>;
};
