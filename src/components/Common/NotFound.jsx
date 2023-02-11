import styled from "@emotion/styled";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/notFound.svg";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <NotFoundLayout>
      <img
        className="notFound"
        src={notFound}
        style={{ maxWidth: "300px" }}
        alt="notFound"
      />
      <h2>페이지를 찾을 수 없습니다.</h2>
      <Button
        sx={{ fontWeight: "bold" }}
        size="large"
        variant="contained"
        onClick={() => navigate("/", { replace: true })}
      >
        홈으로 되돌아가기
      </Button>
    </NotFoundLayout>
  );
};

const NotFoundLayout = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",

  h2: {
    fontSize: "24px",
    fontWeight: "bold",
    margin: "30px 0px",
  },
}));

export default NotFound;
