// import axios from "axios";
// const baseURL = import.meta.env.VITE_BASE_URL;

// export const apiClient = axios.create=({
//     baseURL: baseURL,
// });

// apiClient.interceptors.request.use((config) => {
//     //Get access token from local storage
//     const token= localStorage.getItem("token");
//     // attach token to Authorization header
//     config.headers.Authorization = `Bearer ${token}`
//     //return config 
//     return config;
// });

import axios from "axios";
const baseURL = import.meta.env.VITE_BASE_URL || "https://pvault.onrender.com";

// Fix: Remove the '=' sign after create
export const apiClient = axios.create({
    baseURL: baseURL,
});

// Add error handling to interceptor
apiClient.interceptors.request.use((config) => {
    // Get access token from local storage
    const token = localStorage.getItem("token");
    
    // Ensure headers object exists
    if (!config.headers) {
        config.headers = {};
    }
    
    // Attach token to Authorization header if it exists
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Return config
    return config;
});