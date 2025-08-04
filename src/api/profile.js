// api/profile.js
import apiClient from "../api/apiClient"; // your configured Axios instance

export const updateProfile = async (formData) => {
  const response = await apiClient.put("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
