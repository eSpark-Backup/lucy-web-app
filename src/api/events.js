// src/api/eventApi.js
import apiClient from "./apiClient";

// ✅ GET all events
export const getAllEvents = async () => {
  const response = await apiClient.get("/events");
  return response.data;
};

// ✅ GET single event by ID
export const getEventById = async (id) => {
  const response = await apiClient.get(`/events/${id}`);
  return response.data;
};

// ✅ CREATE event
export const createEvent = async (formData) => {
  const response = await apiClient.post("/events", formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ UPDATE event by ID
export const updateEvent = async (id, formData) => {
  const response = await apiClient.put(`/events/${id}`, formData, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};

// ✅ DELETE event by ID
export const deleteEvent = async (id) => {
  const response = await apiClient.delete(`/events/${id}`);
  return response.data;
};
