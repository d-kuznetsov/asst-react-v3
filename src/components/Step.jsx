import Field from "./Field";
import { useAsstContext } from "../context";

const Step = ({ config, nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const handleNext = () => {
    if (node.error) {
      return;
    }
    const nextStepId = config.next()
    dispatch({
      type: "SET_CURRENT_STEP_ID",
      stepId: nextStepId,
    })
  }

  return (
    <div>
      <div>
        {config.title}
      </div>
      <div>
        {config.fields.map((fieldConfig, idx) => {
          return (
            <div key={fieldConfig.id}>
              <Field config={fieldConfig} nodeId={node.children[idx]} />
            </div>
          );
        })}
      </div>
      <div>
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step;
