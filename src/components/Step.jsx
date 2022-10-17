import Field from "./Field";
import { useAsstContext } from "./../context";

const Step = ({ config, nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];

  return (
    <div>
      <div>
        {config.title} {nodeId}
      </div>
      <div>
        {config.fields.map((fieldConfig, idx) => {
          return (
            <div key={fieldConfig.id}>
              <Field config={fieldConfig} nodeId={node.list[idx]} />
            </div>
          );
        })}
      </div>
      {/* <div>
        <button onClick={handleNext}>Next</button>
      </div> */}
    </div>
  );
};

export default Step;
