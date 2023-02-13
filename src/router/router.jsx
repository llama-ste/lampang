import { Routes, Route } from "react-router-dom";

import Layout from "../components/Layout/Layout";
import Home from "../pages/Home";
import AdminHome from "../pages/AdminHome";
import Category from "../pages/Category";
import AdminCategory from "../pages/AdminCategory";
import SignIn from "../pages/SignIn";
import NewProduct from "../pages/NewProduct";
import NotFound from "../pages/NotFound";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<Home />} />
        <Route path="categories/:categoryId" element={<Category />} />
        <Route path="admin" element={<AdminHome />} />
        <Route
          path="admin/categories/:categoryId"
          element={<AdminCategory />}
        />
      </Route>
      <Route path="/admin/sign-in" element={<SignIn />} />
      <Route path="/admin/new-product" element={<NewProduct />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Router;
