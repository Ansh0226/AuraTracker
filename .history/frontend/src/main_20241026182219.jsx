// index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

const clientId = "609766100196-o8c3cgk5pt0p2emi2ktmgc9u09qunu5k.apps.googleusercontent.com"; // Default value for testing

root.render(
  <GoogleOAuthProvider clientId={clientId}>
    <App />
  </GoogleOAuthProvider>
);
