import { FIELD_TYPES } from "../field-types";
import { useAsstContext } from "../context";

const FieldOverview = ({ nodeId }) => {
  const { asstState } = useAsstContext();
  const node = asstState.nodes[nodeId];

  let view;
  switch (node.config.type) {
    case FIELD_TYPES.TEXT:
      view = (
        <div>
          <div>{node.config.title}</div>
          <div>{node.value}</div>
        </div>
      );
      break;
    case FIELD_TYPES.CHECKBOX:
      view = (
        <div>
          <div>{node.config.title}</div>
          <div>{node.value ? "Yes" : "No"}</div>
        </div>
      );
      break;
    case FIELD_TYPES.COMPOUND:
      view = (
        <div>
          {node.children?.map((listItemId) => {
            return (
              <fieldset key={listItemId}>
                {asstState.nodes[listItemId].children.map((id) => {
                  return <FieldOverview key={id} nodeId={id} />;
                })}
              </fieldset>
            );
          })}
        </div>
      );
      break;
    default:
      view = <div>Unknown field type</div>;
  }
  return view;
};

const Overview = ({ nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const { stepHistory, rootNodeId } = asstState;
  const rootNode = asstState.nodes[rootNodeId];
  const node = asstState.nodes[nodeId];

  const handleNext = () => {
    dispatch({
      type: "SET_CURRENT_STEP_ID",
      stepId: node.config.next(),
    });
  };
  const handleBack = () => {
    dispatch({
      type: "STEP_BACK",
    });
  };

  const items = rootNode.children
    .filter((id) => {
      const stepName = asstState.nodes[id].config.id;
      return stepHistory.includes(stepName);
    })
    .map((id) => {
      return asstState.nodes[id];
    });

  return (
    <div>
      <div>Overview</div>
      <div>
        {items.map((node) => {
          return (
            <div key={node.id}>
              <div>{node.config.title}</div>
              <div>
                {node.children.map((id) => {
                  return <FieldOverview key={id} nodeId={id} />;
                })}
              </div>
            </div>
          );
        })}
      </div>
      <div>
        {!!asstState.stepHistory.length && (
          <button onClick={handleBack}>Prev</button>
        )}
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Overview;
