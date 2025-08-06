import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedEvent: null,
  events: [],
  contents: [],          // ✅ All contents for selected event
  selectedContent: null, // ✅ Single content if needed
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    // ✅ Event-related reducers
    setSelectedEvent: (state, action) => {
      state.selectedEvent = action.payload;
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
      state.contents = []; // Clear contents when event is cleared
      state.selectedContent = null;
    },

    // Content-related reducers
    setEventContents: (state, action) => {
      state.contents = action.payload;
    },
    addEventContent: (state, action) => {
      state.contents.push(action.payload);
    },
    updateEventContent: (state, action) => {
      const updated = action.payload;
      const index = state.contents.findIndex((c) => c.id === updated.id);
      if (index !== -1) {
        state.contents[index] = updated;
      }
    },
    deleteEventContent: (state, action) => {
      state.contents = state.contents.filter((c) => c.id !== action.payload);
    },
    setSelectedContent: (state, action) => {
      state.selectedContent = action.payload;
    },
    clearSelectedContent: (state) => {
      state.selectedContent = null;
    },
  },
});

export const {
  setSelectedEvent,
  clearSelectedEvent,
  setEventContents,
  addEventContent,
  updateEventContent,
  deleteEventContent,
  setSelectedContent,
  clearSelectedContent,
} = eventSlice.actions;

export default eventSlice.reducer;
