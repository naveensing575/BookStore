import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";
import { clientId, domain } from "../auth0.config";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <SnackbarProvider>
        <App />
      </SnackbarProvider>
    </BrowserRouter>
  </Auth0Provider>
);
