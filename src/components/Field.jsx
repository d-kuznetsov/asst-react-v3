import { useState } from "react";
import A from "./base/A";
import B from "./base/B";
import TextField from './base/TextField'
import CompoundField from "./CompoundField";
import { useAsstContext } from "../context";

const Field = ({ config, nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const [touched, setTouched] = useState(asstState.touchedStep);

  const { value } = node;
  const handleUpdate = (value) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      nodeId,
      value,
      config,
    });
    setTouched(true);
  };

  let component;
  switch (config.type) {
    case "CA":
      component = <TextField value={value} onUpdate={handleUpdate} />;
      break;
    case "CB":
      component = <B value={value} onUpdate={handleUpdate} />;
      break;
    case "CF":
      component = (
        <CompoundField config={config} Field={Field} nodeId={nodeId} />
      );
      break;
    default:
      component = <span>Unknown component</span>;
  }

  return (
    <>
      {!node.hidden && (
        <div>
          <div>{config.title}</div>
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
