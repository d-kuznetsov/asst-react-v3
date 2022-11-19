import { useState, useLayoutEffect, useCallback } from "react";
import { memo } from "react";
import MuiTextField from "@mui/material/TextField";

function TextField(props) {
  // console.log("RENDER TextField");
  const { value, size, error, options, onUpdate } = props;
  const { label = "", type = "text", multiline = false } = options;
  const [innerValue, setInnerValue] = useState(value);
  const handleChange = useCallback((e) => setInnerValue(e.target.value), []);
  const handleBlur = ({ target }) => {
    onUpdate(target.value);
  };

  useLayoutEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <MuiTextField
      value={innerValue}
      size={size}
      error={error}
      multiline={multiline}
      type={type}
      label={label}
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default memo(TextField);
