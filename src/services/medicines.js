import { apiClient } from "./config";

// Create (POST) Medicine
export const createMedicine = async (payload) => {
  return apiClient.post("/api/medicine", payload, {
    headers: { "Content-Type": "application/json" },
  });
};

// Read (GET) All Medicines
export const getMedicines = async () => {
  return apiClient.get("/api/medicine");
};

// Update (PUT) Medicine
export const updateMedicine = async (id, payload) => {
  return apiClient.put(`/api/medicine/${id}`, payload, {
    headers: { "Content-Type": "application/json" },
  });
};

// Delete (DELETE) Medicine
export const deleteMedicine = async (id) => {
  return apiClient.delete(`/api/medicine/${id}`);
};
