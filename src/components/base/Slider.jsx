import { memo, useState, useLayoutEffect } from "react";
import MuiSlider from "@mui/material/Slider";

function Slider({ value, size, onUpdate }) {
  // console.log("RENDER Slider");
  const [innerValue, setInnerValue] = useState(value);
  const handleChange = (_, newValue) => {
    setInnerValue(newValue);
  };
  const handleChangeCommitted = () => {
    onUpdate(innerValue);
  };

  useLayoutEffect(() => {
    setInnerValue(value);
  }, [value]);

  return (
    <MuiSlider
      value={innerValue}
      onChange={handleChange}
      size={size}
      onChangeCommitted={handleChangeCommitted}
    />
  );
}

export default memo(Slider);
