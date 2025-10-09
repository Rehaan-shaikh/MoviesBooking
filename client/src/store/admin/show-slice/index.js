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

// ✅ Fetch All Active Shows
export const getActiveShows = createAsyncThunk(
  "shows/getActiveShows",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/show/getActiveShows",
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
      .addCase(getActiveShows.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getActiveShows.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shows = action.payload.shows || [];
      })
      .addCase(getActiveShows.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Error fetching shows";
      });
  },
});

export default showSlice.reducer;
