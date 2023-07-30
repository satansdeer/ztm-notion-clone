import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthSessionProvider } from "./auth/AuthSessionContext"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthSessionProvider>
        <App />
      </AuthSessionProvider>
    </BrowserRouter>
  </React.StrictMode>
);
