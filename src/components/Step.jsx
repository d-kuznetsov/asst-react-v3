import Field from "./Field";
import { useAsstContext } from "../context";

const Step = ({ nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];
  
  const handleNext = () => {
    if (node.error) {
      dispatch({
        type: "SET_TOUCHED",
      });
      return;
    }
    const nextStepId = node.config.next(node.hash);
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
      <div>{node.config.title}</div>
      <div>
        {node.children.map((id) => {
          return (
            <div key={id}>
              <Field nodeId={id} />
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
