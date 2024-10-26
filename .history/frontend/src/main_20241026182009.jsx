import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <GoogleOAuthProvider clientId={"609766100196-o8c3cgk5pt0p2emi2ktmgc9u09qunu5k.apps.googleusercontent.com"}>
    <App />
  </GoogleOAuthProvider>
);
