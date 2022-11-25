import styled from "@emotion/styled";
import { LinearProgress } from "@mui/material";

const LoadingBar = ({ isLoading }) => {
  return (
    isLoading && (
      <Container>
        <LinearProgress />
      </Container>
    )
  );
};

const Container = styled("div")(() => ({
  backgroundColor: "transparent",
  height: "100vh",
  left: 0,
  position: "fixed",
  top: 0,
  width: "100%",
  zIndex: 1000,
}));

export default LoadingBar;
