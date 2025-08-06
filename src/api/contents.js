import apiClient from "./apiClient";

export const getAllEventContents = async (eventId) => {
  const response = await apiClient.get(`/events/${eventId}/contents`);
  return response.data;
};

export const getEventContentById = async (eventId, contentId) => {
  const response = await apiClient.get(`/events/${eventId}/contents/${contentId}`);
  return response.data;
};

export const createEventContent = async (eventId, contentData) => {
  const response = await apiClient.post(`/events/${eventId}/contents`, contentData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const updateEventContent = async (eventId, contentId, contentData) => {
  const response = await apiClient.put(`/events/${eventId}/contents/${contentId}`, contentData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

export const deleteEventContent = async (eventId, contentId) => {
  const response = await apiClient.delete(`/events/${eventId}/contents/${contentId}`);
  return response.data;
};