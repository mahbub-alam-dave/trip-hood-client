
import { useContext } from "react";
import { useRoleBasedRedirect } from "./useRoleBasedRedirect";
import { ContextValues } from "../contexts/ContextValue";
import useUserRole from "./useUserRole";
import Loading from "../../components/sharedComponents/Loading";

const RedirectPage = () => {
  const { loading } = useContext(ContextValues);
  const { role, roleLoading } = useUserRole();

  useRoleBasedRedirect(role);

  if (loading || roleLoading) {
    return <Loading />;
  }

  return null; // Or a loading skeleton or blank screen until redirect happens
};

export default RedirectPage;
