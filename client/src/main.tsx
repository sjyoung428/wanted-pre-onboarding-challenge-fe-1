import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import { BrowserRouter } from "react-router-dom";
import { GlobalStyle } from "@/styles/global";
import Layout from "./components/Layout/Layout";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { HelmetProvider } from "react-helmet-async";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ReactQueryDevtools />
        <GlobalStyle />
        <HelmetProvider>
          <Layout>
            <App />
          </Layout>
        </HelmetProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </>
);
