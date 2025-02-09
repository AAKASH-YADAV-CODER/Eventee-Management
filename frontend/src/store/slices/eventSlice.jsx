import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://eventee-management.onrender.com/api/v1/events/";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventFormData, thunkAPI) => {
    try {
      const response = await axios.post(API_URL, eventFormData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(API_URL, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const joinEvent = createAsyncThunk(
  "events/join",
  async (eventId, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/${eventId}/join`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "events/fetchById",
  async (eventId, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/${eventId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "events/delete",
  async (eventId, thunkAPI) => {
    try {
      await axios.delete(`${API_URL}/${eventId}`, {
        withCredentials: true,
      });
      return eventId;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateEvent = createAsyncThunk(
  "events/update",
  async ({ id, eventData }, thunkAPI) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, eventData, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const eventSlice = createSlice({
  name: "events",
  initialState: {
    events: [],
    currentEvent: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events.push(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(joinEvent.fulfilled, (state, action) => {
        const index = state.events.findIndex(
          (e) => e._id === action.payload._id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
      })
      .addCase(fetchEventById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEvent = action.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.events = state.events.filter(
          (event) => event._id !== action.payload
        );
        state.currentEvent = null;
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEvent.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.events.findIndex(
          (event) => event._id === action.payload._id
        );
        if (index !== -1) {
          state.events[index] = action.payload;
        }
        state.currentEvent = action.payload;
      })
      .addCase(updateEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default eventSlice.reducer;
