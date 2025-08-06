import axios from "axios";

const lord = axios.create({
  baseURL: "http://56.228.3.108:4000",
});

lord.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => reject(error)
);

export const registerUser = async (username, password) => {
  return await lord.post('/users/register', { username, password }
    
  );
};
export const addProduct = async (name, description, price) => {
  return await lord.post('/product', { name, description, price }
  );
};

export const loginUser = async (username , password) => {
  return await lord.post('/users/login', { username, password });
};

export default lord;