import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define your initial state
const initialState = {
    user: localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : {},
    loading: false,
    error: null,
    message: null, // Add message field
};

// Define your async thunk for making API requests
export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async (credentials, { rejectWithValue }) => {
        try {
            const response = await axios.post("/api/users/login", credentials);
            return response.data;

        } catch (error) {
            if (error.response) {
                return rejectWithValue(error.response.data);
            } else {
                return rejectWithValue({ error: "Network error occurred" });
            }
        }
    })
// Define your slice
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError(state) {
            state.error = null;
        },
        clearMessage(state) { // Add clearMessage action
            state.message = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null; // Reset error when starting API call
                state.message = null; // Reset message when starting API call
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.data;
                state.error = null;
                state.message = action.payload.message; // Set message from API response
                console.log(action.payload.data)
                localStorage.setItem("users", JSON.stringify(action.payload.data));

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.error || "Something went wrong";
                state.message = action.payload.message || "Something went wrong";
            });
    },
});

export const { clearError, clearMessage } = authSlice.actions;
export default authSlice.reducer;
