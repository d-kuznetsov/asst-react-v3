export const createContext = (config) => {
  return {
    startStepId: config.steps[0].id,
    steps: {
      ...config.steps.reduce((acc, step) => ({
        ...acc,
        [step.id]: step,
      }), {})
    }
  }
}