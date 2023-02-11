import { Navigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { getCookie } from "../common/cookie";
import ProductList from "../components/Product/ProductList";

const CategoryTab = () => {
  const hasToken = !!getCookie("token");
  const { pathname } = useLocation();
  const isAdminPage = pathname.includes("admin");

  if (!hasToken && isAdminPage) {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast.error("로그인을 먼저 해주세요.");
    return <Navigate to="/admin/sign-in" replace={true} />;
  }

  return <ProductList />;
};

export default CategoryTab;
