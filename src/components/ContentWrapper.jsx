import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";

const ContentWrapper = (props) => {
  const { children, title, stepHistory, onBack, onNext } = props;
  
  return (
    <Card sx={{ py: 1 }}>
      <Box typography="h5" sx={{
        mb: 1,
        textAlign: "center",
      }}>{title}</Box>
      {children}
      <Box
        sx={{
          mt: 1,
        }}
      >
        {!!stepHistory.length && (
          <Button size="large" onClick={onBack}>
            Prev
          </Button>
        )}
        <Button variant="contained" size="large" onClick={onNext}>
          Next
        </Button>
      </Box>
    </Card>
  );
};

export default ContentWrapper;
