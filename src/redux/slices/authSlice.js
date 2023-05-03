import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import jwtDecode from "jwt-decode";

export const authenticate = createAsyncThunk("authenticate", async (role) => {
  try {
    const token = localStorage.getItem("token");

    if (token !== undefined && token !== null) {
      if (jwtDecode(token).exp * 1000 > Date.now()) {
        return role;
      } else {
        // window.location.replace('/login')
        console.log('1');
        localStorage.clear();
        return "visitor";
      }
    } else {
      // window.location.replace('/login')
      console.log('2');
      localStorage.clear();
      return "visitor";
    }
  } catch (error) {
    console.error(error);
  }
});
export const unauthenticate = createAsyncThunk("unauthenticate", async () => {
  localStorage.clear();
  return "visitor";
});

export const authSlice = createSlice({
  name: "isAuth",
  initialState: {
    auth: JSON.parse(localStorage.getItem("user"))?.role || "visitor", // if we have a user in local storage,
    //we set the initial state to the user's role, otherwise we set it to "visitor"

    //// user: JSON.parse(localStorage.getItem("user")), // {id, name, email, role} i think its not necessary/////
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.auth = action.payload;
      })
      .addCase(unauthenticate.fulfilled, (state, action) => {
        state.auth = action.payload;
      });
  },
});
export const selectAuth = (state) => state.isAuth.auth;

export default authSlice.reducer;
