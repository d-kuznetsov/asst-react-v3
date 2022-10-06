const makeFields = (config) => {
  return config.steps.reduce();
};

export const createContext = (config) => {
  return {
    startStepId: config.steps[0].id,
    steps: {
      ...config.steps.reduce(
        (acc, step) => ({
          ...acc,
          [step.id]: {
            ...step,
            fieldOrder: step.fields.map(({ id }) => id),
            fields: step.fields.reduce(() => {}, {}),
          },
        }),
        {}
      ),
    },
    fields: {
      ...config.steps.reduce((asstAcc, step) => {
        return {
          ...asstAcc,
          ...step.fields.reduce((stepAcc, field) => {
            return {
              ...stepAcc,
              [`${step.id}-${field.id}`]: field,
            };
          }, {}),
        };
      }, {}),
    },
  };
};
