import Field from "./Field";
import { useAsstContext } from "../context";

const Step = ({ config, nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  const handleNext = () => {
    if (node.error) {
      dispatch({
        type: "SET_TOUCHED",
      });
      return;
    }
    const nextStepId = config.next(node.hash);
    dispatch({
      type: "SET_CURRENT_STEP_ID",
      stepId: nextStepId,
    });
  };

  const handleBack = () => {
    dispatch({
      type: "STEP_BACK",
    });
  }

  return (
    <div>
      <div>{config.title}</div>
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
        {!!asstState.stepHistory.length && <button onClick={handleBack}>Prev</button>}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step;
