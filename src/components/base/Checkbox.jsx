import { memo } from "react";
import MuiCheckbox from "@mui/material/Checkbox";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

function Checkbox(props) {
  // console.log("RENDER Checkbox");
  const { value, size, label, onUpdate } = props;
  const handleChange = ({ target }) => {
    onUpdate(target.checked);
  };
  return (
    <MuiFormControlLabel
      control={
        <MuiCheckbox size={size} checked={value} onChange={handleChange} />
      }
      label={label}
    />
  );
}

export default memo(Checkbox);
