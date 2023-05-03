import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { privateAxios } from "../../api/axios";

export const deleteUser = createAsyncThunk("user/delete", async (id) => {
  try {
    const response = await privateAxios.delete(`User/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ id, user }) => {
    try {
      const response = await privateAxios.patch(`User/${id}`, user);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addUser = createAsyncThunk("user/add", async (user) => {
  try {
    const response = await privateAxios.post("User", user);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getUsers = createAsyncThunk("user/all", async () => {
  try {
    const response = await privateAxios.get("User/all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const getUser = createAsyncThunk("user/", async (id) => {
  try {
    const response = await privateAxios.get(`User/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
//TODO
//what is userAdded
const userSlice = createSlice({
  name: "userList",
  initialState: {
    user: {},
    users: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(addUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(addUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.users.map((user) => {
          if (user.id === action.payload.id) {
            user = action.payload;
          } else {
            state.status = "failed";
          }
        });
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter(
          (user) => user.id !== action.payload.id
        );
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectUsers = (state) => state.userList.users;
export const selectUser = (state) => state.userList.user;
export const selectUserStatusState = (state) => state.userList.status;
export const selectUserErrorState = (state) => state.userList.error;

export default userSlice.reducer;
