// slice/planSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../../api/axios';
import {toast} from '../../../components/common/toast/Toast';

// Async thunks
export const fetchPlans = createAsyncThunk(
  'plans/fetchPlans',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/plans');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchPlanById = createAsyncThunk(
  'plans/fetchPlanById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/plans/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createPlan = createAsyncThunk(
  'plans/createPlan',
  async (planData, { rejectWithValue }) => {
    try {
      const response = await api.post('/plans', planData);
      toast.success("Plan created successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePlan = createAsyncThunk(
  'plans/updatePlan',
  async ({ id, planData }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/plans/${id}`, planData);
      toast.success("Plan updated successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePlanStatus = createAsyncThunk(
  'plans/updatePlanStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/plans/${id}/status`, { status });
      toast.success("Plan status updated successfully");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deletePlan = createAsyncThunk(
  'plans/deletePlan',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/plans/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Initial state
const initialState = {
  plans: [],
  currentPlan: null,
  loading: false,
  error: null,
  success: false
};

// Plan slice
const planSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
    setCurrentPlan: (state, action) => {
      state.currentPlan = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all plans
      .addCase(fetchPlans.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlans.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload.data;
        state.error = null;
      })
      .addCase(fetchPlans.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch plans';
      })
      // Fetch plan by ID
      .addCase(fetchPlanById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlanById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload.data;
        state.error = null;
      })
      .addCase(fetchPlanById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch plan';
      })
      // Create plan
      .addCase(createPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans.unshift(action.payload.data);
        state.success = true;
        state.error = null;
      })
      .addCase(createPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create plan';
        state.success = false;
      })
      // Update plan
      .addCase(updatePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updatePlan.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.plans.findIndex(
          plan => plan.id === action.payload.data.id
        );
        if (index !== -1) {
          state.plans[index] = action.payload.data;
        }
        state.currentPlan = action.payload.data;
        state.success = true;
        state.error = null;
      })
      .addCase(updatePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update plan';
        state.success = false;
      })
      // Update plan status
      .addCase(updatePlanStatus.fulfilled, (state, action) => {
        const index = state.plans.findIndex(
          plan => plan.id === action.payload.data.id
        );
        if (index !== -1) {
          state.plans[index] = action.payload.data;
        }
        if (state.currentPlan && state.currentPlan.id === action.payload.data.id) {
          state.currentPlan = action.payload.data;
        }
      })
      // Delete plan
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(deletePlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = state.plans.filter(
          plan => plan.id !== action.payload
        );
        state.success = true;
        state.error = null;
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete plan';
        state.success = false;
      });
  }
});

export const { clearError, clearSuccess, setCurrentPlan } = planSlice.actions;
export default planSlice.reducer;