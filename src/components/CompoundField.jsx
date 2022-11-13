import { useAsstContext } from "../context";

const CompoundField = ({ Field, nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const handleAdd = () => {
    dispatch({
      type: "ADD_COMPOUND_FIELD",
      nodeId,
    });
  };

  const handleDelete = (nodeId) => {
    dispatch({
      type: "DELETE_COMPOUND_FIELD",
      nodeId,
    });
  }

  return (
    <fieldset>
      <div>
        {node.children &&
          node.children.map((id) => {
            return (
              <fieldset key={id}>
                <button onClick={() => handleDelete(id)}>X</button>
                {asstState.nodes[id].children.map((id) => {
                  return (
                    <Field
                      key={id}
                      nodeId={id}
                    />
                  );
                })}
              </fieldset>
            );
          })}
      </div>
      <button onClick={handleAdd}>add</button>
    </fieldset>
  );
};

export default CompoundField;
