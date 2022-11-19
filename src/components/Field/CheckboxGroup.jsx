import { memo } from "react";
import MuiFormGroup from "@mui/material/FormGroup";
import MuiFormControlLabel from "@mui/material/FormControlLabel";
import MuiCheckbox from "@mui/material/Checkbox";

function CheckboxGroup(props) {
  // console.log("RENDER CheckboxGroup");
  const { value, options, size, onUpdate } = props;
  const { items } = options;
  const handleChange = ({ target }) => {
    onUpdate({
      ...value,
      [target.name]: target.checked,
    });
  };

  return (
    <MuiFormGroup>
      {items.map(({ label, value: name }) => {
        return (
          <MuiFormControlLabel
            key={name}
            control={
              <MuiCheckbox
                checked={!!value[name]}
                onChange={handleChange}
                size={size}
                name={name}
              />
            }
            label={label}
          />
        );
      })}
    </MuiFormGroup>
  );
}

export default memo(CheckboxGroup);
