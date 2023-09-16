import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from 'react-router-dom'
import App from "./App";
import baseUrl from "./lib/baseUrl";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const reactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      networkMode: import.meta.env.VITE_RQ_NETWORK,
      refetchOnWindowFocus: false,
    }
  }
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter basename={baseUrl}>
    <React.StrictMode>
      <QueryClientProvider client={reactQueryClient}>
        <App />
        <ToastContainer autoClose={2000} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </React.StrictMode>
  </BrowserRouter>
);
