import { createBrowserRouter, Navigate } from "react-router";
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
import ManageProfile from "../pages/dashboard/common/ManageProfile";
import ManageStories from "../pages/dashboard/common/ManageStories";
import BecomeGuide from '../pages/dashboard/tourists/BecomeGuide'
import PaymentPage from "../pages/payment/PaymentPage";
import AddStoryPage from "../pages/dashboard/common/AddStoryPage";
// import UpdateStoryPage from "../pages/dashboard/common/UpdateStoryPage";
import UpdateStory from "../pages/dashboard/common/UpdateStory";
import Forbidden from "../pages/errors/Forbidden";
import GuidesRoutes from "./GuidesRoutes";
import TouristRoutes from "./TouristRoutes";
import AdminRoutes from "./AdminRoutes";
import AddPackage from "../pages/dashboard/admin/AddPackage";
import ManageUsers from "../pages/dashboard/admin/ManageUsers";
import ManageCandidates from "../pages/dashboard/admin/ManageCandidates";
import MyAssignedTours from "../pages/dashboard/guides/MyAssignedTours";
import ErrorPage from "../components/general/ErrorPage";
import RedirectPage from "../utility/hooks/RedirectPage";

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
                index: true, // 👈 this is equivalent to path: ''
      element: <Navigate to="/dashboard/profile" replace />
            },
            {
                path: 'profile',
                element: <ManageProfile />
            },
            {
                path: 'add-story',
                element: <AddStoryPage />
            },
            {
                path: 'manage-stories',
                element: <ManageStories />
            },
            {
                path: 'edit-story/:id',
                element: <UpdateStory />
            },
            {
                path: "my-bookings",
                element: <TouristRoutes><MyBookings /></TouristRoutes>
            },
            {
                path: "join-as-guide",
                element: <TouristRoutes> <BecomeGuide /> </TouristRoutes>
            },
            {
                path: 'payment/:id',
                element: <PaymentPage />
            },
            {
                path: "my-assigned-tours",
                element: <GuidesRoutes> <MyAssignedTours /> </GuidesRoutes>
            },
            {
                path: 'add-tour-package',
                element: <AdminRoutes> <AddPackage /> </AdminRoutes>
            },
            {
                path: 'manage-users',
                element: <AdminRoutes> <ManageUsers /> </AdminRoutes>
            },
            {
                path: 'manage-candidates',
                element: <AdminRoutes> <ManageCandidates /> </AdminRoutes>
            }
        ]
    },
    {
        path: 'forbidden',
        element: <Forbidden />
    },
    {
        path: "*",
        element: <ErrorPage />
    },
    {
        path: "redirect",
        element: <RedirectPage />
    }
])