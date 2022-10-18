import { useAsstContext } from "../context";

const CompoundField = ({ config, Field, nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const handleAdd = () => {
    dispatch({
      type: "ADD_COMPOUND_FIELD",
      nodeId,
      fields: config.fields,
    });
  };

  return (
    <fieldset>
      <div>
        {node.children &&
          node.children.map((id) => {
            return (
              <fieldset key={id}>
                test
                {config.fields.map((fieldConfig, idx) => {
                  return (
                    <Field
                      key={fieldConfig.id}
                      config={fieldConfig}
                      nodeId={asstState.nodes[id].children[idx]}
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
