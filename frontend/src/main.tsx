import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Auth0Provider
    domain="dev-ve53o0frwgysxy5v.us.auth0.com"
    clientId="G2Tkzis6n4ggvXLc1oNeS5INRHh8y2md"
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
