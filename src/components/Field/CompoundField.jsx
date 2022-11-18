import { useAsstContext } from "../../context";

import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import AddIcon from "@mui/icons-material/AddCircleTwoTone";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/DeleteForeverTwoTone";

const CompoundField = ({ Field, nodeId }) => {
  const { asstState, dispatch } = useAsstContext();
  const node = asstState.nodes[nodeId];

  const handleAdd = () => {
    dispatch({
      type: "ADD_COMPOUND_FIELD",
      nodeId,
    });
  };
  const handleDelete = (nodeId) => {
    dispatch({
      type: "DELETE_COMPOUND_FIELD",
      nodeId,
    });
  };

  return (
    <>
      {!!node.children?.length && (
        <Stack
          spacing={1}
          sx={{
            p: 1,
            backgroundColor: "grey.100",
            borderRadius: 1,
          }}
        >
          {node.children?.map((id) => {
            return (
              <Card key={id}>
                <IconButton onClick={() => handleDelete(id)}>
                  <DeleteIcon fontSize="medium" />
                </IconButton>
                {asstState.nodes[id].children.map((id) => {
                  return <Field key={id} nodeId={id} />;
                })}
              </Card>
            );
          })}
        </Stack>
      )}
      <Box display="flex" justifyContent="center" mt={1}>
        <Button
          variant="outlined"
          size="small"
          endIcon={<AddIcon />}
          onClick={handleAdd}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default CompoundField;
