import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Root from "./routes/root";
import NotFoundPage from "./not-found";
import HomePage from "./routes/home";
import LoginPage from "./routes/login";
import RegisterPage from "./routes/register";
import ResetPasswordPage from "./routes/resetPassword";
import ProtectedPage from "./routes/protected";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    errorElement: <NotFoundPage/>
  },
  {
    path: "/home",
    element: <HomePage />,
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
    path: "/protected",
    element: <ProtectedPage />,
    errorElement: <NotFoundPage/>
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
