import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { ContextValues } from "../contexts/ContextValue";
import useAxiosSecure from "./useAxiosSecure";

const useUserRole = () => {
  const { user, loading: authLoading } = useContext(ContextValues);
  const axiosSecure = useAxiosSecure();

  const {
    data: roleData,
    isLoading: roleLoading,
    refetch,
  } = useQuery({
    enabled: !authLoading && !!user?.email,
    queryKey: ["userRole", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`${import.meta.env.VITE_app_url}/users/role?email=${user?.email}`);
      return res.data;
    },
  });

  return { role: roleData?.role, roleLoading: authLoading || roleLoading, refetch };
};

export default useUserRole;