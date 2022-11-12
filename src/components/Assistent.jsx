import StepIndicator from "./StepIndicator";
import Step from "./Step";
import Overview from "./Overview";
import { useAsstContext } from "../context";

const Assistent = ({ config }) => {
  const { asstState } = useAsstContext();
  const { rootNodeId, currentStepId } = asstState;
  const node = asstState.nodes[rootNodeId];
  const currentStepIdx = config.steps.findIndex(
    ({ id }) => id === currentStepId
  );
  const stepNodeId = node.children[currentStepIdx];
  const stepConfig = config.steps[currentStepIdx];
  const { type: stepType } = stepConfig;

  return (
    <div>
      <StepIndicator config={config} />
      {stepType === "STEP_TYPE_DONE" ? (
        <div>Done</div>
      ) : stepType === "STEP_TYPE_OVERVIEW" ? (
        <Overview asstConfig={config} stepConfig={stepConfig}/>
      ) : (
        <Step config={stepConfig} nodeId={stepNodeId} />
      )}
    </div>
  );
};

export default Assistent;
