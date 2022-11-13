import { useState } from "react";
import TextField from "./base/TextField";
import Checkbox from "./base/Checkbox";
import CompoundField from "./CompoundField";
import { useAsstContext } from "../context";
import { FIELD_TYPES } from "../field-types";

const Field = ({ nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const [touched, setTouched] = useState(asstState.touchedStep);

  const { value } = node;
  const handleUpdate = (value) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      nodeId,
      value,
      config: node.config,
    });
    setTouched(true);
  };

  let component;

  switch (node.config.type) {
    case FIELD_TYPES.TEXT:
      component = <TextField value={value} onUpdate={handleUpdate} />;
      break;
    case FIELD_TYPES.CHECKBOX:
      component = <Checkbox value={value} onUpdate={handleUpdate} />;
      break;
    case FIELD_TYPES.COMPOUND:
      component = (
        <CompoundField Field={Field} nodeId={nodeId} />
      );
      break;
    default:
      component = <span>Unknown component</span>;
  }

  return (
    <>
      {!node.hidden && (
        <div>
          <div>{node.config.title}</div>
          {component}
          {(touched || asstState.touchedStep) && node.error && (
            <div className="error">{node.error}</div>
          )}
        </div>
      )}
    </>
  );
};

export default Field;
