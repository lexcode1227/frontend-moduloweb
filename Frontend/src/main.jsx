import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./routes/root";
import NotFoundPage from "./not-found";
import LoginPage from "./routes/login";
import RegisterPage from "./routes/register";
import ResetPasswordPage from "./routes/resetPassword";
import DashboardPage from "./routes/dashboard";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/login",
    element: <LoginPage />,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/register",
    element: <RegisterPage />,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/resetPassword",
    element: <ResetPasswordPage />,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/dashboard",
    element: <DashboardPage />,
    errorElement: <NotFoundPage/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
