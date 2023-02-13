import { Box, Tabs, Tab } from "@mui/material";
import styled from "@emotion/styled";
import { useResetRecoilState } from "recoil";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import { sortState } from "../../state/sort";
import useGetCategories from "../../hooks/query/category/useGetCategories";
import { useEffect, useState } from "react";

const MobileTabs = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { pathname } = useLocation();
  const { data } = useGetCategories();
  const resetSort = useResetRecoilState(sortState);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const isAdminSite = pathname.includes("admin");

  useEffect(() => {
    const categoryId = params?.categoryId ? Number(params.categoryId) : 0;
    setSelectedCategory(categoryId);
  }, [params]);

  return (
    data && (
      <MobileTabsBox>
        <Tabs
          variant="scrollable"
          scrollButtons={false}
          value={selectedCategory}
        >
          {[{ id: 0, name: "전체보기" }, ...data].map((category) => (
            <Tab
              key={category.id}
              value={Number(category.id)}
              label={category.name}
              onClick={() => {
                resetSort();
                category.id === 0
                  ? navigate(isAdminSite ? "/admin" : "/")
                  : navigate(
                      isAdminSite
                        ? `/admin/categories/${category.id}`
                        : `/categories/${category.id}`
                    );
              }}
            />
          ))}
        </Tabs>
      </MobileTabsBox>
    )
  );
};

const MobileTabsBox = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
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

export default MobileTabs;
