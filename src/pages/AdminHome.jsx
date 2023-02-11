import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductList from "../components/Product/ProductList";
import { getCookie } from "../common/cookie";

const AdminHome = () => {
  const hasToken = !!getCookie("token");

  if (!hasToken) {
    toast.dismiss();
    toast.clearWaitingQueue();
    toast.error("로그인을 먼저 해주세요.");
    return <Navigate to="/admin/sign-in" replace={true} />;
  }

  return <ProductList />;
};
export default AdminHome;
