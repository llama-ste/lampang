import styled from "@emotion/styled";
import { Typography } from "@mui/material";
import notFound from "../../assets/notFound.svg";

const EmptyContent = () => {
  return (
    <Container>
      <img
        className="notFound"
        src={notFound}
        style={{ maxWidth: "200px" }}
        alt="notFound"
      />
      <Typography sx={{ fontWeight: "bold", fontSize: "24px" }}>
        데이터가 없습니다.
      </Typography>
    </Container>
  );
};

const Container = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  height: "80%",
}));

export default EmptyContent;
