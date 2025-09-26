import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import config from "../../../config";



export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
      try {
        const response = await axios.post(`${config.baseUrl}/login`, credentials);
        // console.log("Login successful, response data:", response.data); // Log the full login response
  
        const { token, data } = response.data;
        const user = data[0]; // Access the user object (first element in the data array)
        
        if (user) {
          localStorage.setItem('token', token); // Store token in localStorage
          localStorage.setItem('id', user.id); // Store user id in localStorage
  
          return { token, user }; // Return the user object
        } else {
          throw new Error("User data is missing");
        }
      } catch (error) {
        // console.error("Login error:", error); // Log login error
        return rejectWithValue(error.response?.data || "Login failed");
      }
    }
  );
  
  // Async thunk for fetching user details
  export const fetchUserDetails = createAsyncThunk(
    'auth/fetchUserDetails',
    async (_, { rejectWithValue, getState }) => {
      try {
        const id = getState().auth.id || localStorage.getItem('id')
        if (!id) {
          throw new Error("User ID is missing in state"); // If id is missing in state
        }
  
        const token = localStorage.getItem('token'); // Retrieve token from localStorage
        if (!token) {
          throw new Error("Token is missing"); // If token is missing
        }
  
        // console.log("Fetching user details with token:", token); // Log token
        const response = await axios.get(`${config.baseUrl}/user-details/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send token in Authorization header
          },
        });
  
        // console.log("Fetched user details:", response.data); // Log the fetched user details
        return response.data; // Return user data
      } catch (error) {
        console.error("Error fetching user details:", error); // Log error
        return rejectWithValue(error.response?.data || "Error fetching user details");
      }
    }
  );
  
  // Async thunk for logging out the user
  export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
      localStorage.removeItem('token'); // Remove token from localStorage
      localStorage.removeItem('id'); // Remove id from localStorage
    }
  );

  export const updateAdminDetails = createAsyncThunk(
    'auth/updateAdminDetails',
    async({id, email, username, password}, {rejectWithValue}) =>{
      try {
        const token = localStorage.getItem('token');
        if(!token){
          throw new Error("Token is missing");
        }
        const response = await axios.put(`${config.baseUrl}/admin/update/${id}`,
          {email, username, password},
          {
            headers:{
              Authorization: `Bearer ${token}`,
          }
        }
        );
        console.log("Admin details updated", response.data);
        return response.data;
      }catch(error){
        console.error("Error updating details", error);
        return rejectWithValue(error.response?.data);
      }
    }
  )
  
  // The initial state of the auth slice
  const authSlice = createSlice({
    name: "auth",
    initialState: {
      isAuthenticated: false,
      user: null,
      id: localStorage.getItem('id'),
      error: null,
      loading: false,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(loginUser.fulfilled, (state, action) => {
          // console.log("Login successful, setting user data:", action.payload); // Log on login success
          state.isAuthenticated = true;
          state.user = action.payload.user; // Set the user data from the login response
          state.id = action.payload.user.id; // Store the user id from the login response
          state.loading = false;
        })
        .addCase(loginUser.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
          // console.error("Login failed:", action.payload); // Log login failure
        })
        .addCase(fetchUserDetails.pending, (state) => {
          state.loading = true;
          state.error = null;
          // console.log("Fetching user details..."); // Log when fetching starts
        })
        .addCase(fetchUserDetails.fulfilled, (state, action) => {
          console.log("User details fetched successfully:", action.payload); // Log on successful fetch
          state.user = action.payload; // Set user data from API response
          state.loading = false;
        })
        .addCase(fetchUserDetails.rejected, (state, action) => {
          state.error = action.payload;
          state.loading = false;
          console.error("Failed to fetch user details:", action.payload); // Log fetch failure
        })
        .addCase(logoutUser.fulfilled, (state) => {
          state.isAuthenticated = false;
          state.user = null;
          state.id = null; // Clear id on logout
          state.error = null;
          state.loading = false;
          console.log("User logged out, state cleared"); // Log logout
        })
        .addCase(updateAdminDetails.pending,(state) =>{
          state.loading= true;
          state.error = null;
          console.log("Updaing admin details..");
        })
        .addCase(updateAdminDetails.fulfilled, (state, action) =>{
          console.log("Admin details updated successfully", action.payload);
          state.user = action.payload.data;
          state.loading = false;
        })
        .addCase(updateAdminDetails.rejected, (state, action) =>{
          state.error = action.payload;
          state.loading= false;
          console.error("Failed to update admin details:", action.payload)
        })
    },
  });
  
  export default authSlice.reducer;