// slice/serviceSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';
import {toast} from '../../../components/common/toast/Toast';

// Async thunks
export const fetchServices = createAsyncThunk(
  'services/fetchServices',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/plan-services');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchServiceById = createAsyncThunk(
  'services/fetchServiceById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/plan-services/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createService = createAsyncThunk(
  'services/createService',
  async (serviceData, { rejectWithValue }) => {
    try {
      const response = await api.post('/plan-services', serviceData);
      toast.success("Service created successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateService = createAsyncThunk(
  'services/updateService',
  async ({ id, serviceData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/plan-services/${id}`, serviceData);
      toast.success("Service updated successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateServiceStatus = createAsyncThunk(
  'services/updateServiceStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/plan-services/${id}/status`, { status });
      toast.success("Service status updated successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteService = createAsyncThunk(
  'services/deleteService',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/plan-services/${id}`);
      toast.success("Service deleted successfully");
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  services: [],
  currentService: null,
  loading: false,
  error: null,
  success: false
};

// Service slice
const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentService: (state, action) => {
      state.currentService = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all services
      .addCase(fetchServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServices.fulfilled, (state, action) => {
        state.loading = false;
        state.services = action.payload.data;
        state.error = null;
      })
      .addCase(fetchServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch services';
      })
      // Fetch service by ID
      .addCase(fetchServiceById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchServiceById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentService = action.payload.data;
        state.error = null;
      })
      .addCase(fetchServiceById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch service';
      })
      // Create service
      .addCase(createService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createService.fulfilled, (state, action) => {
        state.loading = false;
        state.services.unshift(action.payload.data);
        state.success = true;
        state.error = null;
      })
      .addCase(createService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create service';
        state.success = false;
      })
      // Update service
      .addCase(updateService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.services.findIndex(
          service => service.id === action.payload.data.id
        );
        if (index !== -1) {
          state.services[index] = action.payload.data;
        }
        state.currentService = action.payload.data;
        state.success = true;
        state.error = null;
      })
      .addCase(updateService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update service';
        state.success = false;
      })
      // Update service status
      .addCase(updateServiceStatus.fulfilled, (state, action) => {
        const index = state.services.findIndex(
          service => service.id === action.payload.data.id
        );
        if (index !== -1) {
          state.services[index] = action.payload.data;
        }
        if (state.currentService && state.currentService.id === action.payload.data.id) {
          state.currentService = action.payload.data;
        }
      })
      // Delete service
      .addCase(deleteService.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.loading = false;
        state.services = state.services.filter(
          service => service.id !== action.payload
        );
        state.success = true;
        state.error = null;
      })
      .addCase(deleteService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete service';
        state.success = false;
      });
  }
});

export const { clearError, clearSuccess, setCurrentService } = serviceSlice.actions;
export default serviceSlice.reducer;