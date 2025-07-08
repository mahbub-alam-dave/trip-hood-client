import React, { useContext } from 'react';

import axios from "axios";
import { ContextValues } from '../contexts/ContextValue';

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_app_url}`
})

const useAxiosSecure = () => {

    const {user} = useContext(ContextValues)

    axiosSecure.interceptors.request.use(config => {
        config.headers.Authorization = `Bearer ${user.accessToken}`
    })

    return axiosSecure
};

export default useAxiosSecure;