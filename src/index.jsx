import "react-toastify/dist/ReactToastify.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Reset } from "styled-reset";
import { CookiesProvider } from "react-cookie";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";

import CustomRouter from "./router/CustomRouter";
import customHistory from "./router/customHistory";

import "./index.css";
import theme from "./styles/theme";
import App from "./App";
import { toastConfig, queryOptions } from "./config";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient(queryOptions);

root.render(
  <React.StrictMode>
    <CookiesProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Reset />
            <CssBaseline />
            <ToastContainer {...toastConfig} />
            <CustomRouter history={customHistory}>
              <App />
            </CustomRouter>
          </RecoilRoot>
        </ThemeProvider>
      </QueryClientProvider>
    </CookiesProvider>
  </React.StrictMode>
);
