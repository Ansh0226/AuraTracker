import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import { StrictMode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";

import App from "./App";
import Login from "./pages/Login";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import DashBoard from "./pages/DashBoard";

const clientId =
  "609766100196-o8c3cgk5pt0p2emi2ktmgc9u09qunu5k.apps.googleusercontent.com"; // Default value for testing

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path= "home" element={<Home />} />
      <Route path="signup" element={<SignUp />} />
      <Route path="dashboard" element={<DashBoard />} />
      <Route path="login" element={<Login />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>
);
