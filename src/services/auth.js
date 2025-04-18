// import { apiClient } from "./config";

// export const apiSignup = async (payload) => {
//     return apiClient.post("/users/signup", payload, {
//         Headers: {
//             "Content-Type": "application/json",
//         },

//     });
//     };

// export const apiLogin = async (payload) => {
//     return apiClient.post("/users/login", payload, {
//         Headers: {
//             "Content-Type": "application/json"
//         },
//     });
// };

import API from "./config";


export const signupUser = async (formData) => {
  const response = await API.post("/users/signup", formData);
  return response.data; 
};


export const loginUser = async (formData) => {
  const response = await API.post("/users/login", formData);
  return response.data; 
};
