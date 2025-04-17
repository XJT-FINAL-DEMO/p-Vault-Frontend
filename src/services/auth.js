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

import { apiClient } from "./config";

export const apiSignup = async (payload) => {
    return apiClient.post("/users/signup", payload, {
        headers: { // Fix: lowercase 'headers' (not 'Headers')
            "Content-Type": "application/json",
        },
    });
};

export const apiLogin = async (payload) => {
    return apiClient.post("/users/login", payload, {
        headers: { // Fix: lowercase 'headers' (not 'Headers')
            "Content-Type": "application/json"
        },
    });
};