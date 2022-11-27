import { FIELD_TYPES } from "../field-types";
import { useAsstContext } from "../context";
import ContentWrapper from "./ContentWrapper";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Paper";
import Box from "@mui/material/Box";

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

  const handleSubmit = async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        value: true,
      });
      await node.config.submit(rootNode.value);
      dispatch({
        type: "SET_CURRENT_STEP_ID",
        stepId: node.config.next(),
      });
    } catch (err) {
      console.error(err);
    } finally {
      dispatch({
        type: "SET_LOADING",
        value: false,
      });
    }
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
    <ContentWrapper
      onBack={handleBack}
      onNext={handleSubmit}
      stepHistory={asstState.stepHistory}
      title="Overview"
    >
      <Stack spacing={2} sx={{
        px: 2
      }}>
        {items.map((node) => {
          return (
            <Card key={node.id} elevation={3}>
              <Box typography="h5">{node.config.title}</Box>
              <div>
                {node.children.map((id) => {
                  return <FieldOverview key={id} nodeId={id} />;
                })}
              </div>
            </Card>
          );
        })}
      </Stack>
    </ContentWrapper>
  );
};

export default Overview;
