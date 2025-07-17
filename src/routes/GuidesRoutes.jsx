import React, { useContext } from 'react';
import { ContextValues } from '../utility/contexts/ContextValue';
import { Navigate } from 'react-router';
import useUserRole from '../utility/hooks/useUserRole';
import Loading from '../components/sharedComponents/Loading';

const GuidesRoutes = ({children}) => {
    
    const {user, loading} = useContext(ContextValues)
    const {role, roleLoading} = useUserRole()



    if(loading || roleLoading) {
        return <Loading />
    }

    if(!user || role !== "tour_guide") {
        return <Navigate to={"/forbidden"}></Navigate>
    }
    
    
    return children
};

export default GuidesRoutes;