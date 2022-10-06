import A from "./base/A";
import B from "./base/B";
import { useAsstContext } from "./../context";

const Field = ({ config, parentId }) => {
  const { asstState, dispatch } = useAsstContext();
  const { value } = asstState.stepMap[parentId].fieldMap[config.id];
  const handleUpdate = (value) => {
    dispatch({
      type: "SET_FIELD_VALUE",
      stepId: parentId,
      fieldId: config.id,
      value,
    });
  };

  switch (config.type) {
    case "CA":
      return <A value={value} onUpdate={handleUpdate} />;
    case "CB":
      return <B value={value} onUpdate={handleUpdate} />;
    default:
      return <span>Unknown component</span>;
  }
};

export default Field;
