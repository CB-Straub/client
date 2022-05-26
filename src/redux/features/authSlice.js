import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../axios'



export const login = createAsyncThunk( "auth/login",
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

export const register = createAsyncThunk( "auth/register",
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Sign up Successful!");
      navigate("/");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
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
        state.user = action.payload;  //reducer for persisting user info even after refresh
      },
      setLogout: (state, action) => {
        localStorage.clear(); //clears user data from local storage
        state.user = null;  // logout reducer, header component/handleLogout function
      },
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
      },
      [register.pending]: (state, action) => {
        state.loading = true;
      },
      [register.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.user = action.payload;
      },
      [register.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      },
    }
})


export const { setUser, setLogout} = authSlice.actions
export default authSlice.reducer