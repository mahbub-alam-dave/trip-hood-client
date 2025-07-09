
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: `${import.meta.env.VITE_app_url}`
})

const useAxiosSecure = () => {

    
    axiosSecure.interceptors.request.use(config => {
        const token = localStorage.getItem("access-token")

        if(token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })

    return axiosSecure
};

export default useAxiosSecure;