import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "@/styles/global";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ReactQueryDevtools />
        <GlobalStyle />
        <Layout>
          <App />
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
);
