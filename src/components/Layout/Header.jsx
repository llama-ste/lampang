import styled from "@emotion/styled";
import { useRecoilValue } from "recoil";
import { Button } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";

import { deleteCookie } from "../../common/cookie";
import { categoriesState } from "../../state/categories";
import subLogo1 from "../../assets/subLogo1.svg";
import subLogo2 from "../../assets/subLogo2.svg";

const Header = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const categories = useRecoilValue(categoriesState);
  const isAdminPage = pathname.includes("admin");

  const logoutHandler = () => {
    navigate("/admin/sign-in", { replace: true });
    deleteCookie("token");
    deleteCookie("username");
  };

  return (
    <HeaderContainer>
      <HeaderWrapper isAdminPage={isAdminPage}>
        <TitleBox>
          <div style={{ display: "flex", alignItems: "center" }}>
            <h1>
              {params?.categoryId
                ? `${categories[params.categoryId]}  `
                : isAdminPage
                ? "Lampang Admin  "
                : "Lampang  "}
            </h1>
            {params?.categoryId ? (
              <img src={subLogo2} alt="logo" style={{ width: "24px" }} />
            ) : (
              <img src={subLogo1} alt="logo" style={{ width: "24px" }} />
            )}
          </div>
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
    </HeaderContainer>
  );
};

const HeaderContainer = styled("div")(({ theme }) => ({
  height: "80px",
  [theme.breakpoints.up("md")]: {
    height: "auto",
  },
}));

const HeaderWrapper = styled("div")(({ isAdminPage, theme }) => ({
  display: "flex",
  justifyContent: isAdminPage ? "space-between" : "start",
  alignItems: "center",
  borderBottom: "0.5px solid #000000CC",
  padding: "20px 20px 10px 20px",
  width: "100%",
  [theme.breakpoints.down("md")]: {
    position: "fixed",
    background: "#fff",
    zIndex: 1000,
    height: "80px",
    padding: "20px 20px 15px 20px",
  },
}));

const TitleBox = styled("div")(() => ({
  h1: {
    fontSize: "24px",
    fontWeight: "bold",
    paddingTop: "4px",
    marginRight: "5px",
  },
  h2: {
    fontSize: "14px",
    marginTop: "10px",
    color: "gray",
  },
}));

export default Header;
