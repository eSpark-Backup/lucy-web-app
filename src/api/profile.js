import apiClient from "../api/apiClient"; 

export const updateProfile = async (formData) => {
  const response = await apiClient.put("/profile", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
