import React, { useContext } from 'react';
import { ContextValues } from '../utility/contexts/ContextValue';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    
    const {user, loading} = useContext(ContextValues)
    const location  = useLocation()

    if(loading) return <span className='loading loading-spinner'></span>
    if(!user) {
      return <Navigate to={'/login'} state={location.pathname}></Navigate>
    }

    return children
};

export default PrivateRoutes;