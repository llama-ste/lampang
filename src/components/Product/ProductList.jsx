import { Button, styled, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useRecoilState } from "recoil";

import useIntersectionObserver from "../../hooks/common/useIntersectionObserver";
import useGetProducts from "../../hooks/query/product/useGetProducts";
import ProductItem from "./ProductItem";
import LoadingBar from "../Common/LoadingBar";
import { sortState } from "../../state/sort";
import EmptyContent from "../Common/EmptyContent";
import AdminProductItem from "./AdminProductItem";

const ProductList = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  const [sort, setSort] = useRecoilState(sortState);
  const sortChange = (_, newValue) => {
    setSort(newValue);
  };
  const scrollObserver = useRef(null);
  const { data, hasNextPage, fetchNextPage, isLoading, isFetching } =
    useGetProducts(sort, params?.categoryId);
  const products = data?.pages?.map((page) => page.data.products).flat();
  const isAdminPage = pathname.includes("admin");

  useIntersectionObserver({
    target: scrollObserver,
    onIntersect: fetchNextPage,
    enabled: !!hasNextPage,
  });

  if (!isLoading && products?.length === 0) return <EmptyContent />;

  return (
    products?.length > 0 && (
      <>
        <LoadingBar isLoading={isLoading || isFetching} />
        <ButtonWrapper>
          <ToggleButtonGroup
            sx={{ maxWidth: "300px", height: "40px" }}
            fullWidth
            exclusive
            color="primary"
            value={sort}
            onChange={sortChange}
          >
            <ToggleButton value="latest">최신순</ToggleButton>
            <ToggleButton value="highest_price">높은가격순</ToggleButton>
            <ToggleButton value="lowest_price">낮은가격순</ToggleButton>
          </ToggleButtonGroup>
          {isAdminPage && (
            <Button
              onClick={() => navigate("/admin/new-product")}
              sx={{ fontWeight: 600 }}
              variant="contained"
            >
              상품추가
            </Button>
          )}
        </ButtonWrapper>
        <Container>
          {products.map((product) =>
            isAdminPage ? (
              <AdminProductItem
                affiliateUrl={product["affiliate_url"]}
                key={product.id}
                image={product["image_url"]}
                title={product.name}
                price={product.price}
                description={product.description}
                productId={product.id}
              />
            ) : (
              <ProductItem
                affiliateUrl={product["affiliate_url"]}
                key={product.id}
                image={product["image_url"]}
                title={product.name}
                price={product.price}
                description={product.description}
              />
            )
          )}
        </Container>
        <div ref={scrollObserver} />
      </>
    )
  );
};

const Container = styled("div")(() => ({
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  gridTemplateRows: "auto",
  gap: "20px",
  overflow: "scroll",
  padding: "1px",
}));

const ButtonWrapper = styled("div")(() => ({
  display: "flex",
  width: "100%",
  justifyContent: "space-between",
}));

export default ProductList;
