import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../config";

export const fetchAllUsers = createAsyncThunk(
  "users/fetchAll",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.get(
        `${config.baseUrl}/users/get-users`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log("Fetched users:", response.data);
      return response.data.users; // Return only the array
    } catch (error) {
      throw error;
    }
  }
);

export const userslice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
    error: null,
  },
  reducers: {
    // Define any additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.users = action.payload;
        } else {
          console.error("Expected array but got:", action.payload);
          state.users = [];
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || " Failed to fetch Users";
      });
  },
});

export default userslice.reducer;
