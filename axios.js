import axios from "axios";
import Cookies from "js-cookie";

const lord = axios.create({
    baseURL : "https://dummyjson.com"
});

lord.interceptors.request.use(
    (config) => {
        const token = typeof window !== "undefined" ? Cookies.get("token") : null;
        if (token) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default lord