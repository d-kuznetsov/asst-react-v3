import { useState } from "react";
import { useAsstContext } from "../../context";
import { FIELD_TYPES } from "../../field-types";

import { Box } from "../base";
import ErrorIcon from "@mui/icons-material/ErrorTwoTone";

import TextField from "./TextField";
import Checkbox from "./Checkbox";
import CompoundField from "./CompoundField";

const Field = ({ nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const [touched, setTouched] = useState(asstState.touchedStep);
  const showError = (touched || asstState.touchedStep) && node.error;

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
      component = <TextField value={node.value} onUpdate={handleUpdate} />;
      break;
    case FIELD_TYPES.CHECKBOX:
      component = <Checkbox value={node.value} onUpdate={handleUpdate} />;
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
        <Box
          sx={{
            px: 1,
            border: 2,
            borderRadius: 1,
            borderColor: showError ? "error.light" : "background.default",
          }}
        >
          <Box typography="subtitle1">{node.config.title}</Box>
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
      )}
    </>
  );
};

export default Field;
