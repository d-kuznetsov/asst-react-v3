import { useAsstContext } from "../context";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const StepIndicator = ({ config }) => {
  const { asstState } = useAsstContext();
  const { currentStepId } = asstState;
  const activeStepIdx = config.steps.findIndex(
    ({ id }) => id === currentStepId
  );

  return (
    <Stepper activeStep={activeStepIdx} alternativeLabel>
      {config.steps.map((step) => {
        return (
          <Step key={step.id}>
            <StepLabel>{step.title}</StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default StepIndicator;
