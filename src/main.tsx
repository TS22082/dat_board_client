import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AppStateProvider from "./context/AppStateProvider/index.tsx";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppStateProvider>
      <ToastContainer />
      <App />
    </AppStateProvider>
  </React.StrictMode>
);
