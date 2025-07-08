import axios from 'axios';
import React from 'react';

const instance = axios.create({
    baseURL: `${import.meta.VITE_app_url}`
})

const useSimpleAxios = () => {
    return instance
};

export default useSimpleAxios;