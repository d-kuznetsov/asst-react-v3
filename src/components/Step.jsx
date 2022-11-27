import { useAsstContext } from "../context";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

import Field from "./Field";

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
    dispatch({
      type: "SET_CURRENT_STEP_ID",
      stepId: node.config.next(node.value),
    });
  };

  const handleBack = () => {
    dispatch({
      type: "STEP_BACK",
    });
  };

  return (
    <Card sx={{ py: 1 }}>
      <Box typography="h5">{node.config.title}</Box>
      <Grid container spacing={1} columns={2} sx={{p: 1}}>
        {node.children.map((id) => {
          return <Field key={id} nodeId={id} />;
        })}
      </Grid>
      <Box
        sx={{
          mt: 1,
        }}
      >
        {!!asstState.stepHistory.length && (
          <Button size="large" onClick={handleBack}>
            Prev
          </Button>
        )}
        <Button variant="contained" size="large" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Card>
  );
};

export default Step;
