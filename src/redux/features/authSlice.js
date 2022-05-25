import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../axios'



export const login = createAsyncThunk(
  "auth/login",
  async ({ formValue, navigate, toast }, {rejectWithValue} ) => {
    try {
      const response = await api.login(formValue);
      toast.success("Login Successfull");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data)
    }
  }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
      user: null,
      error: "",
      loading: false,
    }, 
    reducers: {
      setUser: (state, action) => {
        state.user = action.payload;
      }
    },

    //lifecycles,  .addCase = [] 
    extraReducers: {
      [login.pending]: (state, action) => {
        state.loading = true
      }, 
      [login.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      },
      [login.rejected]: (state, action) => {
        state.loading = false
        state.error = action.payload.message // message from the  backend  user controller
      }
    }
})

export default authSlice.reducer