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
      <TitleBox>
        <h1>
          {params?.categoryId
            ? categories[params.categoryId]
            : isAdminPage
            ? "Lampang Admin🦙"
            : "Lampang 🦙"}
        </h1>
        <h2>
          ※ 쿠팡 파트너스 활동을 통해 일정액의 수수료를 제공받을 수 있습니다.
        </h2>
      </TitleBox>

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

const TitleBox = styled("div")(() => ({
  h1: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  h2: {
    fontSize: "14px",
    marginTop: "6px",
    color: "gray",
  },
}));

export default Header;
