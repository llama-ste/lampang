import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { Button } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { deleteCookie } from "../../common/cookie";
import { categoriesState } from "../../state/categories";

const Header = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const categories = useRecoilValue(categoriesState);
  const isAdminPage = pathname.includes("admin");

  const logoutHandler = () => {
    navigate("/admin/sign-in", { replace: true });
    deleteCookie("token");
    deleteCookie("refreshToken");
    deleteCookie("username");
  };

  return (
    <HeaderWrapper isAdminPage={isAdminPage}>
      <Title>
        {params?.categoryId
          ? categories[params.categoryId]
          : isAdminPage
          ? "Lampang Admin🦙"
          : "Lampang 🦙"}
      </Title>
      {isAdminPage && (
        <Button
          onClick={logoutHandler}
          sx={{ fontWeight: "bold" }}
          color="inherit"
        >
          로그아웃
        </Button>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled("div")(({ isAdminPage }) => ({
  display: "flex",
  justifyContent: isAdminPage ? "space-between" : "start",
  alignItems: "center",
  borderBottom: "0.5px solid #000000CC",
  padding: "20px 20px 10px 20px",
}));

const Title = styled("h1")(() => ({
  fontSize: "20px",
  fontWeight: "bold",
}));

export default Header;
