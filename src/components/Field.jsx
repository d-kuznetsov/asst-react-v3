import A from "./base/A";
import B from "./base/B";
import CompoundField from "./CompoundField";
import { useAsstContext } from "../context";

const Field = ({ config, nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const { value } = node;
  const handleUpdate = (value) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      nodeId,
      value,
      config,
    });
  };

  let component;
  switch (config.type) {
    case "CA":
      component = <A value={value} onUpdate={handleUpdate} />;
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
    <div>
      <div>{config.title}</div>
      {component}
      <div className="error">{node.error}</div>
    </div>
  );
};

export default Field;
