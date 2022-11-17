import { useState, useLayoutEffect } from "react";
import { memo } from "react";
import { DatePicker as MuiDatePicker } from "@mui/x-date-pickers/DatePicker";
import MuiTextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import deLocale from "date-fns/locale/de";

function isDateValid(date) {
  return date instanceof Date && !isNaN(date);
}

function DatePicker({ value, size, onUpdate }) {
  // console.log("RENDER DatePicker");
  const [innerValue, setInnerValue] = useState(value);
  const handleChange = (date) => {
    onUpdate(typeof date === "undefined" ? innerValue : date);
  };
  const getBlurHandler = (handleBlur) => {
    return function () {
      handleBlur.apply(this, [...arguments]);
      handleChange();
    };
  };

  useLayoutEffect(() => {
    if (
      isDateValid(value) &&
      isDateValid(innerValue) &&
      value.toString() === innerValue.toString()
    ) {
      return;
    }
    setInnerValue(value);
  }, [value]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={deLocale}>
      <MuiDatePicker
        mask="__.__.____"
        value={innerValue}
        reduceAnimations
        onAccept={handleChange}
        onChange={(newValue) => setInnerValue(newValue)}
        renderInput={(params) => {
          params.inputProps.onBlur = getBlurHandler(params.inputProps.onBlur);
          return (
            <MuiTextField {...params} error={false} size={size} fullWidth />
          );
        }}
      />
    </LocalizationProvider>
  );
}

export default memo(DatePicker);
