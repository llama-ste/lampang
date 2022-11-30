import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

import Nav from "./Nav";
import Header from "./Header";
import AdminNav from "./AdminNav";
import ScrollToTop from "../Common/ScrollToTop";
import MobileTabs from "../Mobile/MobileTabs";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const isAdminHome = pathname.includes("admin");

  return (
    <Container>
      <GridContainer>
        <Header />
        <Main>
          <MobileTabs />
          {children}
        </Main>
        <NavWrapper>{isAdminHome ? <AdminNav /> : <Nav />}</NavWrapper>
      </GridContainer>
      <ScrollToTop />
    </Container>
  );
};

const Container = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

const GridContainer = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gridAutoRows: "auto 1fr",
  minHeight: "100vh",
  maxWidth: "1200px",
  width: "100%",
  overflow: "scroll",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "300px 1fr",
  },
  [theme.breakpoints.down("md")]: {
    maxWidth: "900px",
  },
  [theme.breakpoints.down("sm")]: {
    maxWidth: "600px",
  },
}));

const NavWrapper = styled("div")(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "block",
    width: "300px",
    gridRow: "1/3",
  },
}));

const Main = styled("main")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "start",
  flexDirection: "column",
  minWidth: "900px",
  background: "#fff",
  padding: "20px",
  [theme.breakpoints.down("sm")]: {
    minWidth: "0px",
    maxWidth: "590px",
    width: "100%",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "0px",
    maxWidth: "890px",
    width: "100%",
  },
}));

export default Layout;
