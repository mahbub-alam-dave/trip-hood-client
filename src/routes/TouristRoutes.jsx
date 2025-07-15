import React, { useContext } from 'react';
import { ContextValues } from '../utility/contexts/ContextValue';
import useUserRole from '../utility/hooks/useUserRole';

const TouristRoutes = ({children}) => {
    
    const {user, loading} = useContext(ContextValues)
    const {role, roleLoading} = useUserRole()



    if(loading || roleLoading) {
        return <span className='loading loading-spinner'></span>
    }

    if(!user || role !== "tour_guide") {
        return <Navigate to={"/forbidden"}></Navigate>
    }
    
    
    return children
};

export default TouristRoutes;