import { useAsstContext } from "../context";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import EditIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import ToDoIcon from "@mui/icons-material/AssignmentTwoTone";
import SkepedIcon from "@mui/icons-material/LockTwoTone";
import ActiveIcon from "@mui/icons-material/DirectionsRunTwoTone";
import IconButton from "@mui/material/IconButton";

const StepIcon = (props) => {
  const { active, completed, stepId, stepHistory, onEdit } = props;
  const edited = !!stepHistory.find((id) => id === stepId);

  return active ? (
    <IconButton color="primary" size="small" disabled>
      <ActiveIcon color="primary" />
    </IconButton>
  ) : edited ? (
    <IconButton size="small" color="primary" onClick={() => onEdit(stepId)}>
      <EditIcon />
    </IconButton>
  ) : completed ? (
    <IconButton size="small" disabled>
      <SkepedIcon color="default" />
    </IconButton>
  ) : (
    <IconButton size="small" disabled color="default">
      <ToDoIcon />
    </IconButton>
  );
};

const StepIndicator = ({ config }) => {
  const { asstState, dispatch} = useAsstContext();
  const { currentStepId, stepHistory } = asstState;
  const activeStepIdx = config.steps.findIndex(
    ({ id }) => id === currentStepId
  );
  const handleStepEdit = (stepId) => {
    dispatch({
      type: "EDIT_STEP",
      stepId
    })
  }

  return (
    <Stepper activeStep={activeStepIdx} alternativeLabel>
      {config.steps.map((step) => {
        return (
          <Step key={step.id}>
            <StepLabel
              StepIconComponent={StepIcon}
              StepIconProps={{
                stepId: step.id,
                stepHistory,
                onEdit: handleStepEdit
              }}
            >
              {step.title}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default StepIndicator;
