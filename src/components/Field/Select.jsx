import { memo } from "react";
import MuiTextField from "@mui/material/TextField";
import MuiMenuItem from "@mui/material/MenuItem";

function Select(props) {
  const { value, size, error, options, onUpdate } = props;
  const { items, label } = options;
  const handleChange = ({ target }) => {
    onUpdate(target.value);
  };
  return (
    <MuiTextField
      value={value}
      onChange={handleChange}
      size={size}
      error={error}
      label={label}
      select
      fullWidth
    >
      {items.map(({ label, value }) => {
        return (
          <MuiMenuItem key={value} value={value}>
            {label}
          </MuiMenuItem>
        );
      })}
    </MuiTextField>
  );
}

export default memo(Select);
