export const createContext = (config) => {
  return {
    currentStepId: config.steps[0].id
  }
}