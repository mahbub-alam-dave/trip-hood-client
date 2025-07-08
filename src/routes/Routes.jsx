import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/generalPages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Register />
            }
        ]
    }
])