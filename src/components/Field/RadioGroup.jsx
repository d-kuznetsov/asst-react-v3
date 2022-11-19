import { memo } from "react";
import MuiRadioGroup from "@mui/material/RadioGroup";
import MuiRadio from "@mui/material/Radio";
import MuiFormControlLabel from "@mui/material/FormControlLabel";

function RadioGroup(props) {
  // console.log("RENDER RadioGroup");
  const { value, direction, size, options, onUpdate } = props;
  const { items } = options;
  const handleChange = ({ target }) => {
    onUpdate(target.value);
  };
  return (
    <MuiRadioGroup
      value={value}
      row={direction === "row"}
      onChange={handleChange}
    >
      {items.map(({ label, value }) => {
        return (
          <MuiFormControlLabel
            key={value}
            value={value}
            control={<MuiRadio size={size} />}
            label={label}
          />
        );
      })}
    </MuiRadioGroup>
  );
}

export default memo(RadioGroup);
