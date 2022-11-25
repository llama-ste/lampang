import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import ProductList from "../components/Product/ProductList";
import { getCookie } from "../common/cookie";
import { useEffect } from "react";

const AdminHome = () => {
  const navigate = useNavigate();
  const hasToken = !!getCookie("token");

  useEffect(() => {
    if (!hasToken) {
      toast.error("로그인 먼저 해주세요.");
      navigate("/admin/sign-in", { replace: true });
    }
  }, [hasToken, navigate]);

  return <ProductList />;
};
export default AdminHome;
