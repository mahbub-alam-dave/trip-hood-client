import { useContext } from "react"
import { ContextValues } from "../contexts/ContextValue"

import React from 'react';

const useAuth = () => {
    const authInfo = useContext(ContextValues)
    return authInfo
};

export default useAuth;