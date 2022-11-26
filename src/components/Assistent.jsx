import StepIndicator from "./StepIndicator";
import Step from "./Step";
import Overview from "./Overview";
import LoadingIndicator from "./LoadingIndicator";
import Box from "@mui/material/Box";
import ScopedCssBaseline from "@mui/material/ScopedCssBaseline";
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
    <ScopedCssBaseline>
      <Box position="relative">
        <LoadingIndicator />
        <StepIndicator />
        {stepType === "STEP_TYPE_DONE" ? (
          <div>Done</div>
        ) : stepType === "STEP_TYPE_OVERVIEW" ? (
          <Overview nodeId={stepNodeId} />
        ) : (
          <Step nodeId={stepNodeId} />
        )}
      </Box>
    </ScopedCssBaseline>
  );
};

export default Assistent;
