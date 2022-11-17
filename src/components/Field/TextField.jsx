import { useState, useLayoutEffect, useCallback } from "react";
import { memo } from "react";
import MuiTextField from "@mui/material/TextField";

function TextField(props) {
  // console.log("RENDER TextField");
  const { value, size, multiline = false, onUpdate } = props;
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
      multiline={multiline}
      fullWidth
      onChange={handleChange}
      onBlur={handleBlur}
    />
  );
}

export default memo(TextField);
