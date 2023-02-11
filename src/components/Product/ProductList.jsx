import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  styled,
} from "@mui/material";
import { useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
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
  const params = useParams();
  const [sort, setSort] = useRecoilState(sortState);
  const sortChange = (e) => {
    setSort(e.target.value);
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
    <>
      <LoadingBar isLoading={isLoading || isFetching} />
      <ButtonWrapper>
        <FormControl size="small" sx={{ marginBottom: "20px", width: "120px" }}>
          <InputLabel>정렬</InputLabel>
          <Select value={sort} onChange={sortChange} label="정렬">
            <MenuItem value="idDesc">최신순</MenuItem>
            <MenuItem value="highestPrice">높은가격순</MenuItem>
            <MenuItem value="lowestPrice">낮은가격순</MenuItem>
          </Select>
        </FormControl>
      </ButtonWrapper>
      <Container>
        {products?.map((product) =>
          isAdminPage ? (
            <AdminProductItem
              affiliateUrl={product.affiliateUrl}
              key={product.id}
              image={product.imageUrl}
              title={product.name}
              price={product.price}
              description={product.description}
              productId={product.id}
            />
          ) : (
            <ProductItem
              affiliateUrl={product.affiliateUrl}
              key={product.id}
              image={product.imageUrl}
              title={product.name}
              price={product.price}
              description={product.description}
            />
          )
        )}
      </Container>
      <div ref={scrollObserver} />
    </>
  );
};

const Container = styled("div")(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gridTemplateRows: "auto",
  gap: "10px",
  padding: "1px",
  width: "100%",
  minHeight: "100vh",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
  },
}));
const ButtonWrapper = styled("div")(() => ({
  display: "flex",
  justifyContent: "flex-end",
  width: "100%",
  gap: "10px",
}));

export default ProductList;
