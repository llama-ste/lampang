import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Reset } from "styled-reset";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

import "./index.css";
import App from "./App";
import Home from "./pages/Home";
import theme from "./styles/theme";
import SignIn from "./pages/SignIn";
import NewProduct from "./pages/NewProduct";
import Category from "./pages/Category";
import NotFound from "./pages/NotFound";

const root = ReactDOM.createRoot(document.getElementById("root"));

const options = {
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
};

const toastConfig = {
  autoClose: 500,
  bodyStyle: { fontSize: "14px" },
  closeButton: true,
  closeOnClick: true,
  limit: 1,
  pauseOnHover: false,
  position: "top-center",
  progressStyle: {
    background: `linear-gradient(
      to right,
      #4cd964,
      #5ac8fa,
      #007aff,
      #34aadc,
      #5856d6,
      #ff2d55
    )`,
  },
  style: {
    maxWidth: "1000px",
    width: "max-content",
    zIndex: 1000000,
  },
  theme: "light",
};

const queryClient = new QueryClient(options);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Reset />
            <CssBaseline />
            <ToastContainer {...toastConfig} />
            <Router>
              <Routes>
                <Route path="/" element={<App />}>
                  <Route path="/" element={<Home />} />
                  <Route
                    path="/categories/:categoryId"
                    element={<Category />}
                  />
                  <Route path="/admin" element={<Home />} />
                  <Route
                    path="/admin/categories/:categoryId"
                    element={<Category />}
                  />
                </Route>
                <Route path="/admin/sign-in" element={<SignIn />} />
                <Route path="/admin/new-product" element={<NewProduct />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </RecoilRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
