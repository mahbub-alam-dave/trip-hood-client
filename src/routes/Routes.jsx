import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import Home from "../pages/generalPages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import ForgetPassword from "../pages/authentication/ForgetPassword";
import PackageDetails from "../pages/generalPages/PackageDetails";
import GuideDetails from "../pages/generalPages/GuideDetails";
import TripsPackage from "../pages/generalPages/TripsPackage";
import AboutUsPage from "../pages/generalPages/AboutUsPage";

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
            },
            {
                path: 'forgot-password',
                element: <ForgetPassword />
            },
            {
                path: 'packages/:id',
                element: <PackageDetails />
            },
            {
                path: 'guide/:id',
                element: <GuideDetails />
            },
            {
                path: 'trips',
                element: <TripsPackage />
            },
            {
                path: 'about',
                element: <AboutUsPage />
            }
        ]
    }
])