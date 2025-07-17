import React, { useContext } from 'react';
import { ContextValues } from '../utility/contexts/ContextValue';
import { Navigate, useLocation } from 'react-router';
import Loading from '../components/sharedComponents/Loading';

const PrivateRoutes = ({children}) => {
    
    const {user, loading} = useContext(ContextValues)
    const location  = useLocation()

    if(loading) return <Loading />
    if(!user) {
      return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }

    return children
};

export default PrivateRoutes;