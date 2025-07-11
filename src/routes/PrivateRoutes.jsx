import React, { Children, useContext } from 'react';
import { ContextValues } from '../utility/contexts/ContextValue';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({Children}) => {
    
    const {user, loading} = useContext(ContextValues)
    const location  = useLocation()

    if(loading) return <span className='loading loading-spinner'></span>
    if(!user) {
        <Navigate to={'/login'} state={location.pathname}></Navigate>
    }

    return Children
};

export default PrivateRoutes;