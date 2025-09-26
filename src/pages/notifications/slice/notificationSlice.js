import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../config";

export const fetchAllNotifications = createAsyncThunk(
  "notifications/fetchAll",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.get(
        `${config.baseUrl}/notifications`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log("Fetched notifications:", response.data);
      return response.data.notifications; // Return only the array
    } catch (error) {
      throw error;
    }
  }
);

export const notificationslice = createSlice({
  name: "notifications",
  initialState: {
    isLoading: false,
    notifications: [],
    error: null,
  },
  reducers: {
    // Define any additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllNotifications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllNotifications.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.notifications = action.payload;
        } else {
          console.error("Expected array but got:", action.payload);
          state.notifications = [];
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || " Failed to fetch notifications";
      });
  },
});

export default notificationslice.reducer;
