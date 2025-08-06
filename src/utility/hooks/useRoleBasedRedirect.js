import { useNavigate, useLocation } from "react-router";
import { useContext, useEffect } from "react";
import { ContextValues } from "../contexts/ContextValue";
import useUserRole from "./useUserRole";

export const useRoleBasedRedirect = (userRole) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loading } = useContext(ContextValues);
  const { roleLoading } = useUserRole();

  useEffect(() => {
    if (loading || roleLoading || !userRole) return;

    const from = location.state?.from || null;

    const roleBasedRoutes = {
      admin: [
        "/dashboard",
        "/dashboard/add-tour-package",
        "/dashboard/manage-users",
        "/dashboard/manage-candidates",
      ],
      tour_guide: ["/dashboard", "/dashboard/my-assigned-tours"],
      tourist: [
        "/dashboard",
        "/dashboard/my-bookings",
        "/dashboard/join-as-guide",
      ],
    };

    const fallbackRoutes = {
      admin: "/dashboard/manage-users",
      tour_guide: "/dashboard/my-assigned-tours",
      tourist: "/dashboard/my-bookings",
    };

    const isAuthorizedPath =
      from && roleBasedRoutes[userRole]?.some((path) => from.startsWith(path));

    if (isAuthorizedPath) {
      navigate(from);
    } else {
      navigate(fallbackRoutes[userRole] || "/");
    }
  }, [loading, roleLoading, userRole, location, navigate]);
};
