import { FIELD_TYPES } from "../field-types";
import { useAsstContext } from "../context";
import ContentWrapper from "./ContentWrapper";

import Stack from "@mui/material/Stack";
import Card from "@mui/material/Paper";
import Box from "@mui/material/Box";

const FieldOverview = ({ nodeId }) => {
  const { asstState } = useAsstContext();
  const node = asstState.nodes[nodeId];

  let fieldValue;
  switch (node.config.type) {
    case FIELD_TYPES.TEXT:
    case FIELD_TYPES.SLIDER:
      fieldValue = node.value;
      break;
    case FIELD_TYPES.SELECT:
    case FIELD_TYPES.RADIO_GROUP:
      fieldValue = node.config.options.items.find(
        (item) => item.value === node.value
      )?.label;
      break;
    case FIELD_TYPES.CHECKBOX:
      fieldValue = node.value ? "Yes" : "No";
      break;
    case FIELD_TYPES.CHECKBOX_GROUP:
      fieldValue = node.config.options.items
        .filter((item) => {
          return node.value[item.value];
        })
        .map((item) => item.label)
        .join(", ");
      break;
    case FIELD_TYPES.FILE_UPLOAD:
      fieldValue = node.value.map((file) => file.name).join(", ");
      break;
    case FIELD_TYPES.COMPOUND:
      fieldValue = (
        <Stack
          spacing={2}
          sx={{
            p: 1,
          }}
        >
          {node.children?.map((listItemId) => {
            return (
              <Card
                key={listItemId}
                sx={{
                  p: 1,
                  backgroundColor: "grey.100",
                }}
              >
                {asstState.nodes[listItemId].children.map((id) => {
                  return <FieldOverview key={id} nodeId={id} />;
                })}
              </Card>
            );
          })}
        </Stack>
      );
      break;
    default:
      fieldValue = "Unknown field type";
  }
  return (
    <Box>
      <Box
        typography="body1"
        sx={{
          fontWeight: "bold",
        }}
      >
        {node.config.title}
      </Box>
      <Box typography="body1">{fieldValue}</Box>
    </Box>
  );
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
      <Stack
        spacing={2}
        sx={{
          px: 2,
        }}
      >
        {items.map((node) => {
          return (
            <Card
              key={node.id}
              elevation={3}
              sx={{
                p: 1,
              }}
            >
              <Box
                typography="h6"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mb: 1,
                }}
              >
                {node.config.title}
              </Box>
              <Stack spacing={2}>
                {node.children.map((id) => {
                  return <FieldOverview key={id} nodeId={id} />;
                })}
              </Stack>
            </Card>
          );
        })}
      </Stack>
    </ContentWrapper>
  );
};

export default Overview;
