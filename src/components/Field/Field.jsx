import { useState } from "react";
import { useAsstContext } from "../../context";
import { FIELD_TYPES } from "../../field-types";

import { Box } from "../base";
import ErrorIcon from "@mui/icons-material/ErrorTwoTone";

import TextField from "./TextField";
import Checkbox from "./Checkbox";
import Select from "./Select";
import CheckboxGroup from "./CheckboxGroup";
import RadioGroup from "./RadioGroup";
import Slider from "./Slider";
import FileUpload from "./FileUpload";
import CompoundField from "./CompoundField";
import Info from "../Info";
import Grid from "@mui/material/Grid";

const Field = ({ nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const [touched, setTouched] = useState(asstState.touchedStep);
  const showError = (touched || asstState.touchedStep) && !!node.error;

  const handleUpdate = (value) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      nodeId,
      value,
    });
    setTouched(true);
  };

  let component;
  switch (node.config.type) {
    case FIELD_TYPES.TEXT:
      component = (
        <TextField
          value={node.value}
          error={showError}
          options={node.config.options}
          onUpdate={handleUpdate}
        />
      );
      break;
    case FIELD_TYPES.SELECT:
      component = (
        <Select
          value={node.value}
          error={showError}
          options={node.config.options}
          onUpdate={handleUpdate}
        />
      );
      break;
    case FIELD_TYPES.SLIDER:
      component = <Slider value={node.value} onUpdate={handleUpdate} />;
      break;
    case FIELD_TYPES.CHECKBOX:
      component = (
        <Checkbox
          value={node.value}
          options={node.config.options}
          onUpdate={handleUpdate}
        />
      );
      break;
    case FIELD_TYPES.CHECKBOX_GROUP:
      component = (
        <CheckboxGroup
          value={node.value}
          options={node.config.options}
          onUpdate={handleUpdate}
        />
      );
      break;
    case FIELD_TYPES.RADIO_GROUP:
      component = (
        <RadioGroup
          value={node.value}
          options={node.config.options}
          onUpdate={handleUpdate}
        />
      );
      break;
    case FIELD_TYPES.FILE_UPLOAD:
      component = <FileUpload value={node.value} onUpdate={handleUpdate} />;
      break;
    case FIELD_TYPES.COMPOUND:
      component = <CompoundField Field={Field} nodeId={nodeId} />;
      break;
    default:
      component = <span>Unknown component</span>;
  }

  return (
    <>
      {!node.hidden && (
        <Grid item xs={2} sm={node.config.columns || 2}>
          <Box
            sx={{
              border: 2,
              borderRadius: 1,
              borderColor: showError ? "error.light" : "background.default",
              px: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
              typography="subtitle1"
            >
              <span> {node.config.title}</span>
              {!!node.config.info && <Info text={node.config.info} />}
            </Box>
            {component}
            {showError && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "error.dark",
                }}
                typography="subtitle2"
              >
                <ErrorIcon
                  sx={{
                    mr: 1,
                    color: "error.main",
                    fontSize: "small",
                  }}
                />
                {node.error}
              </Box>
            )}
          </Box>
        </Grid>
      )}
    </>
  );
};

export default Field;
