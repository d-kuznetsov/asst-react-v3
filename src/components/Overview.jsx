import { FIELD_TYPES } from "../field-types";
import { useAsstContext } from "../context";

const FieldOverview = ({ config, node }) => {
  const { asstState } = useAsstContext();
  let view;
  switch (config.type) {
    case FIELD_TYPES.TEXT:
      view = (
        <div>
          <div>{config.title}</div>
          <div>{node.value}</div>
        </div>
      );
      break;
    case FIELD_TYPES.CHECKBOX:
      view = (
        <div>
          <div>{config.title}</div>
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
                {config.fields.map((subfield, idx) => {
                  const nodeId = asstState.nodes[listItemId].children[idx];
                  return (
                    <FieldOverview
                      key={nodeId}
                      config={subfield}
                      node={asstState.nodes[nodeId]}
                    />
                  );
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

const Overview = ({ asstConfig, stepConfig }) => {
  const { asstState, dispatch } = useAsstContext();
  const { stepHistory, rootNodeId } = asstState;
  const rootNode = asstState.nodes[rootNodeId];

  const handleNext = () => {
    dispatch({
      type: "SET_CURRENT_STEP_ID",
      stepId: stepConfig.next(),
    });
  }
  const handleBack = () => {
    dispatch({
      type: "STEP_BACK",
    });
  }

  const items = asstConfig.steps
    .map((step, idx) => {
      return {
        stepConfig: step,
        nodeId: rootNode.children[idx],
      };
    })
    .filter((item) => {
      return stepHistory.includes(item.stepConfig.id);
    });

  return (
    <div>
      <div>Overview</div>
      <div>
        {items.map((item) => {
          return (
            <div key={item.nodeId}>
              <div>{item.stepConfig.title}</div>
              <div>
                {item.stepConfig.fields.map((field, fieldIdx) => {
                  const nodeId =
                    asstState.nodes[item.nodeId].children[fieldIdx];
                  return (
                    <FieldOverview
                      key={nodeId}
                      config={field}
                      node={asstState.nodes[nodeId]}
                    />
                  );
                })}
              </div>
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

export default Overview;
