import { createBrowserRouter } from "react-router";
import Root from "../layouts/Root";
import PrivateRoutes from '../routes/PrivateRoutes'
import Home from "../pages/generalPages/Home";
import Login from "../pages/authentication/Login";
import Register from "../pages/authentication/Register";
import ForgetPassword from "../pages/authentication/ForgetPassword";
import PackageDetails from "../pages/generalPages/PackageDetails";
import GuideDetails from "../pages/generalPages/GuideDetails";
import TripsPackage from "../pages/generalPages/TripsPackage";
import AboutUsPage from "../pages/generalPages/AboutUsPage";
import CommunityPage from "../pages/generalPages/CommunityPage";
import DashboardLayout from "../layouts/DashboardLayout";
import MyBookings from "../pages/dashboard/tourists/MyBookings";
import Managestories from "../pages/dashboard/tourists/ManageStories";
import ManageProfile from "../pages/dashboard/common/ManageProfile";
import ManageStories from "../pages/dashboard/tourists/ManageStories";
import BecomeGuide from '../pages/dashboard/tourists/BecomeGuide'

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
            },
            {
                path: 'community',
                element: <CommunityPage />
            }
        ]
    },
    {
        path: 'dashboard',
        element: <PrivateRoutes> <DashboardLayout /> </PrivateRoutes>,
        children: [
            {
                path: 'profile',
                element: <ManageProfile />
            },
            {
                path: "my-bookings",
                element: <MyBookings />
            },
            {
                path: "manage-stories",
                element: <ManageStories />
            },
            {
                path: "join-as-guide",
                element: <BecomeGuide />
            }
        ]
    }
])