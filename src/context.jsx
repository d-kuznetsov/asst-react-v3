import { createContext, useContext, useReducer, useMemo } from "react";

const AsstContext = createContext();

export const useAsstContext = () => useContext(AsstContext);

const SET_CURRENT_STEP_ID = "SET_CURRENT_STEP_ID";
const SET_FIELD_VALUE = "SET_FIELD_VALUE";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_CURRENT_STEP_ID:
      return { ...state, currentStepId: action.currentStepId };
    case SET_FIELD_VALUE:
      return {
        ...state,
        stepMap: {
          ...state.stepMap,
          [action.stepId]: {
            ...state.stepMap[action.stepId],
            fieldMap: {
              ...state.stepMap[action.stepId].fieldMap,
              [action.fieldId]: {
                ...state.stepMap[action.stepId].fieldMap[action.fieldId],
                value: action.value,
              },
            },
          },
        },
      };
    default:
      throw new Error();
  }
};

const createInitialArgs = (config) => {
  return {
    currentStepId: config.steps[0].id,
    stepMap: config.steps.reduce((asstAcc, step) => {
      return {
        ...asstAcc,
        [step.id]: {
          ...step,
          fieldMap: step.fields.reduce((stepAcc, field) => {
            return {
              ...stepAcc,
              [field.id]: {
                ...field,
                value: "",
              },
            };
          }, {}),
        },
      };
    }, {}),
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
