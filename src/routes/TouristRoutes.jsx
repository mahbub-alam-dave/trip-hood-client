import React, { useContext } from 'react';
import { ContextValues } from '../utility/contexts/ContextValue';
import useUserRole from '../utility/hooks/useUserRole';
import Loading from '../components/sharedComponents/Loading';

const TouristRoutes = ({children}) => {
    
    const {user, loading} = useContext(ContextValues)
    const {role, roleLoading} = useUserRole()



    if(loading || roleLoading) {
        return <Loading />
    }

    if(!user || role !== "tourist") {
        return <Navigate to={"/forbidden"}></Navigate>
    }
    
    
    return children
};

export default TouristRoutes;