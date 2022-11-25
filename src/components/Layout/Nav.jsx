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
          Lampang
        </StyledTypography>
      </Toolbar>
      <List>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "24px",
            margin: "0px 0px 5px 24px",
          }}
        >
          카테고리
        </Typography>
        {data &&
          data.map((category, i) => (
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

const NavWrapper = styled("nav")(() => ({
  display: "block",
  gridRow: "1/3",
  width: "300px",
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
