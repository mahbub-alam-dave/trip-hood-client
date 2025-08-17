// DashboardIndex.jsx
import { useContext } from "react";
import { Navigate } from "react-router";
import { ContextValues } from "../utility/contexts/ContextValue";
import useAxiosSecure from "../utility/hooks/useAxiosSecure";
import Loading from "../components/sharedComponents/Loading";
import { useQuery } from "@tanstack/react-query";


const DashboardIndex = () => {
    const { user } = useContext(ContextValues)
  const axiosSecure = useAxiosSecure()


//   fetch user data
const { data: userData = {}, isLoading, } = useQuery({
  queryKey: ["user-data", user?.email],
  queryFn: async () => {
    const res = await axiosSecure.get(`/users/by-email/${user.email}`);
    return res.data;
  },
  enabled: !!user?.email,
});

  if(isLoading) return <Loading />

  if (userData?.role === "admin") {
    return <Navigate to="/dashboard/admin-overview" replace />;
  }
  return <Navigate to="/dashboard/profile" replace />;
};

export default DashboardIndex;
