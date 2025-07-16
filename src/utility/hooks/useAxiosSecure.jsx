
// useAxiosSecure.js
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_app_url,
});

// Attach interceptors only once at module level (not inside function)
axiosSecure.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosSecure.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("access-token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// ✅ Return the already-configured instance
const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
