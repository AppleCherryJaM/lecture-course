import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/MainPage";
import AuthPage from "../pages/AuthPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);
