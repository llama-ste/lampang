import styled from "@emotion/styled";
import { useResetRecoilState } from "recoil";
import { useNavigate, useParams } from "react-router-dom";
import {
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import { sortState } from "../../state/sort";
import useGetCategories from "../../hooks/query/category/useGetCategories";
import mainLogo from "../../assets/mainLogo.svg";

const Nav = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { data } = useGetCategories();
  const resetSort = useResetRecoilState(sortState);

  return (
    <NavWrapper>
      <Toolbar sx={{ margin: "15px 0px" }}>
        <StyledTypography
          onClick={() => {
            resetSort();
            navigate("/");
          }}
        >
          <img
            src={mainLogo}
            alt="logo"
            style={{ width: "50px", marginRight: "5px" }}
          />
          Lampang
        </StyledTypography>
      </Toolbar>
      <List>
        {data &&
          data.map((category) => (
            <StyledListItemButton
              key={category.id}
              onClick={() => {
                resetSort();
                navigate(`/categories/${category.id}`);
              }}
              selected={category.id === Number(params?.categoryId)}
            >
              <ListItemText
                sx={{ marginLeft: "20px" }}
                primary={category.name}
              />
            </StyledListItemButton>
          ))}
      </List>
    </NavWrapper>
  );
};

const NavWrapper = styled("nav")(({ theme }) => ({
  position: "fixed",
  width: "300px",
  minHeight: "100vh",
  background: "#fff",
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "& .MuiTypography-root": {
    fontSize: "17px",
  },
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  "&:hover": {
    color: theme.palette.primary.main,
  },
  cursor: "pointer",
  fontSize: "28px",
  fontWeight: "bold",
}));

export default Nav;
