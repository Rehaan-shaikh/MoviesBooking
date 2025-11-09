import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  shows: [],
  isLoading: false,
  error: null,
};

// ✅ Add Show
export const addShow = createAsyncThunk(
  "shows/addShow",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/show/addShow",
        formData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to add show" }
      );
    }
  }
);

// Get all active movies with their show time for admin dashboard
export const getActiveShowsForAdmin = createAsyncThunk(
  "shows/getActiveShowsForAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/show/getActiveShowsForAdmin",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch shows" }
      );
    }
  }
);

// ✅ Fetch All Active movies for users(which has shows)
export const getActiveShowsForUsers = createAsyncThunk(
  "shows/getActiveShowsForUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/show/getActiveShowsForUsers",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || { message: "Failed to fetch shows" }
      );
    }
  }
);

const showSlice = createSlice({
  name: "shows",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // 🔹 Get Active Shows
      .addCase(getActiveShowsForUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getActiveShowsForUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shows = action.payload.shows || [];
      })
      .addCase(getActiveShowsForUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Error fetching shows";
      })      
      .addCase(getActiveShowsForAdmin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getActiveShowsForAdmin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shows = action.payload.shows || [];
      })
      .addCase(getActiveShowsForAdmin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Error fetching shows";
      })
  },
});

export default showSlice.reducer;