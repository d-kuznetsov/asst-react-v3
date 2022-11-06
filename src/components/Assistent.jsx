import StepIndicator from './StepIndicator'
import Step from "./Step";
import { useAsstContext } from "../context";

const Assistent = ({ config }) => {
  const { asstState } = useAsstContext();
  const { rootNodeId, currentStepId } = asstState;
  const node = asstState.nodes[rootNodeId];
  const currentStepIdx = config.steps.findIndex(
    ({ id }) => id === currentStepId
  );
  const stepNodeId = node.children[currentStepIdx];

  return (
    <div>
      <StepIndicator config={config} />
      <Step config={config.steps[currentStepIdx]} nodeId={stepNodeId} />
    </div>
  );
};

export default Assistent;
