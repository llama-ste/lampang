import { Navigate, useLocation } from "react-router-dom";

import { getCookie } from "../common/cookie";
import ProductList from "../components/Product/ProductList";
import useToastMessage from "../hooks/common/useToastMessage";

const Category = () => {
  const { pathname } = useLocation();
  const showToast = useToastMessage();
  const hasToken = !!getCookie("token");
  const isAdminPage = pathname.includes("admin");

  if (!hasToken && isAdminPage) {
    showToast("error", "로그인을 먼저 해주세요.");
    return <Navigate to="/admin/sign-in" replace={true} />;
  }

  return <ProductList />;
};

export default Category;
