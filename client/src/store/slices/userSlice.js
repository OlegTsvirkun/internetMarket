import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import authService from "../services/authService";
import userServices from "../services/userService";

export const loginUser = createAsyncThunk('LOGIN_USER', async ({ email, password }, thunkAPI) => {
    try {
        return await authService.login(email, password)
    }
    catch (error) {

        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const registerUser = createAsyncThunk('REGISTER_USER', async ({ email, password }, thunkAPI) => {
    try {
        return await authService.registration(email, password)
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const checkUser = createAsyncThunk('CHECK_USER', async (_, thunkAPI) => {
    try {
        return await authService.check()
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const getUserInfo = createAsyncThunk('USER_INFO', async (_, thunkAPI) => {
    try {
        return await userServices.getUserInfo()
    }
    catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
export const userSlice = createSlice({
    name: "user",
    initialState: {
        isAuth: false,
        role: [],
        info:{},
        email: '',

        isInfoError: false,
        isInfoLoading: true,
        
        isError: false,
        isLoading: true,
        message: '',
    },
    reducers: {
        changeAuth: (state, action) => {
            state.isAuth = action.payload
            state.isError = false
            state.email = ''
            state.role = []
            state.info = {}
            localStorage.setItem('token', '')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isAuth = true
                state.email = action.payload.email
                state.role = action.payload.role

            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isAuth = false
                state.email = ''
                state.role = ''
                state.message = action.payload


            })
            //? REGISTRATION
            .addCase(registerUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isAuth = true
                state.email = action.payload.email
                state.role = action.payload.role
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isAuth = false
                state.email = ''
                state.role = []
                state.message = action.payload;
            })
            //? CHECK
            .addCase(checkUser.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(checkUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isError = false
                state.isAuth = true
                state.email = action.payload.email
                state.role = action.payload.role
            })
            .addCase(checkUser.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.isAuth = false
                state.email = ''
                state.role = []
                state.message = action.payload;
            })
            //? USER_INFO
            .addCase(getUserInfo.pending, (state, action) => {
                state.isInfoLoading = true
                state.info={}

            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.isInfoLoading = false
                state.isInfoError = false
                state.info =action.payload.user
            })
            .addCase(getUserInfo.rejected, (state, action) => {
                state.isInfoLoading = false
                state.isInfoError = true
                state.info={}
                state.message = action.payload;
            })
    }
})
export const { changeAuth } = userSlice.actions;
export default userSlice.reducer;
