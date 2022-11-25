import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

import Nav from "./Nav";
import Header from "./Header";
import AdminNav from "./AdminNav";

const Layout = ({ children }) => {
  const { pathname } = useLocation();

  const isAdminHome = pathname.includes("admin");

  return (
    <Container>
      <GridContainer>
        <Header />
        <Main>{children}</Main>
        {isAdminHome ? <AdminNav /> : <Nav />}
      </GridContainer>
    </Container>
  );
};

const Container = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
}));

const GridContainer = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "300px 1fr",
  gridAutoRows: "auto 1fr",
  minHeight: "100vh",
  maxWidth: "1200px",
  overflow: "scroll",
}));

const Main = styled("main")(() => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "start",
  flexDirection: "column",
  minWidth: "900px",
  background: "#fff",
  padding: "20px",
  gap: "20px",
}));

export default Layout;
