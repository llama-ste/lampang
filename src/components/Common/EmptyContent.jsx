import CloudOffIcon from "@mui/icons-material/CloudOff";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const EmptyContent = () => {
  return (
    <Container>
      <CloudOffIcon fontSize="large" sx={{ width: "50px", height: "50px" }} />
      <Typography sx={{ fontWeight: 600 }}>데이터가 없습니다.</Typography>
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
