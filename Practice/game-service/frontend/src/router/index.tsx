import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import MainContentPage from "../pages/MainContentPage";
import CreatePage from "../pages/CreatePage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <MainContentPage />,
            },
            {
                path: "create",
                element: <CreatePage />,
            },
            {
                path: "edit/:id",
                element: <CreatePage />,
            },
        ],
    },
]);