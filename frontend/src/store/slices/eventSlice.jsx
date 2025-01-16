import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  events: [],
  loading: false,
  error: null,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    addEvent: (state, action) => {
      state.events.push(action.payload);
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    },
    addAttendee: (state, action) => {
      const event = state.events.find((e) => e.id === action.payload.eventId);
      if (event) {
        event.attendees.push(action.payload.attendee);
      }
    },
  },
});

export const { addEvent, setEvents, addAttendee } = eventSlice.actions;
export default eventSlice.reducer;
