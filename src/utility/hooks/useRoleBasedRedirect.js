// utils/handleRedirect.js

import { useNavigate, useLocation } from "react-router";
import Loading from "../../components/sharedComponents/Loading";
import { useContext } from "react";
import { ContextValues } from "../contexts/ContextValue";
import useUserRole from "./useUserRole";

export const useRoleBasedRedirect = (userRole) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {loading} = useContext(ContextValues)
  const {roleLoading} = useContext(useUserRole)

  if(loading || roleLoading) return <Loading />

  return () => {
    const from = location.state || null;

    const roleBasedRoutes = {
      admin: ['/dashboard', '/dashboard/add-tour-package', '/dashboard/manage-users', '/dashboard/manage-candidates'],
      tour_guide: ['/dashboard', '/dashboard/my-assigned-tours'],
      tourist: ['/dashboard', '/dashboard/my-bookings', '/dashboard/join-as-guide'],
    };

    const isAuthorizedPath = from && roleBasedRoutes[userRole]?.some(path => from.startsWith(path));

    if (isAuthorizedPath) {
      navigate(from);
    } else {
      const fallbackRoute = {
        admin: '/dashboard/manage-users',
        tour_guide: '/dashboard/my-assigned-tours',
        tourist: '/dashboard/my-bookings',
      }[userRole] || '/';

      navigate(fallbackRoute);
    }
  };
};
