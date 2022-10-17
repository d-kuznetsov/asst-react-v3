import A from "./base/A";
import B from "./base/B";
import CompoundField from "./CompoundField";
import { useAsstContext } from "./../context";

const Field = ({ config, nodeId, parentId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const { value } = node;
  const handleUpdate = (value) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      nodeId,
      value,
    });
  };

  switch (config.type) {
    case "CA":
      return <A value={value} onUpdate={handleUpdate} />;
    case "CB":
      return <B value={value} onUpdate={handleUpdate} />;
    case "CF":
      return <CompoundField config={config} Field={Field} nodeId={nodeId} />;
    default:
      return <span>Unknown component</span>;
  }
};

export default Field;
