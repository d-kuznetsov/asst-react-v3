import { useAsstContext } from "../context";
import styled from "@emotion/styled";
import CircularProgress from "@mui/material/CircularProgress";

const Overlay = styled.div(() => ({
  position: "absolute",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 100,
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  borderRadius: "0.5rem",
}));

const LoadingIndicator = () => {
  const { asstState } = useAsstContext();
  return (
    <>
      {!!asstState.isLoading && (
        <Overlay>
          <CircularProgress size="5rem" thickness={4} />
        </Overlay>
      )}
    </>
  );
};

export default LoadingIndicator;
