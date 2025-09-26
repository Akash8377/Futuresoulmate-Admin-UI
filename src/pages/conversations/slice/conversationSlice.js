import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import config from "../../../config";

export const fetchAllConversations = createAsyncThunk(
  "conversations/fetchAll",
  async () => {
    try {
      const ACCESS_TOKEN = localStorage.getItem("token");
      const response = await axios.get(
        `${config.baseUrl}/conversations`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      );
      console.log("Fetched conversations:", response.data);
      return response.data.conversations; // Return only the array
    } catch (error) {
      throw error;
    }
  }
);

export const conversationslice = createSlice({
  name: "conversations",
  initialState: {
    isLoading: false,
    conversations: [],
    error: null,
  },
  reducers: {
    // Define any additional reducers here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllConversations.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAllConversations.fulfilled, (state, action) => {
        if (Array.isArray(action.payload)) {
          state.conversations = action.payload;
        } else {
          console.error("Expected array but got:", action.payload);
          state.conversations = [];
        }
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchAllConversations.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || " Failed to fetch conversations";
      });
  },
});

export default conversationslice.reducer;
