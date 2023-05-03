import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { privateAxios } from "../../api/axios";

export const deleteUserData = createAsyncThunk("userData/delete", async (id) => {
  try {
    const response = await privateAxios.delete(`UserData/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const updateUserData = createAsyncThunk(
  "userData/update",
  async ({ id, userData }) => {
    try {
      const response = await privateAxios.patch(`UserData/${id}`, userData);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const addUserData = createAsyncThunk("userData/add", async (userData) => {
  try {
    const response = await privateAxios.post("UserData", userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});

export const getUserDatas = createAsyncThunk("userData/all", async () => {
  try {
    const response = await privateAxios.get("UserData/all");
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

export const getUserData = createAsyncThunk("userData/", async (id) => {
  try {
    const response = await privateAxios.get(`UserData/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
//TODO
//what is userDataAdded
const userDataSlice = createSlice({
  name: "userDataList",
  initialState: {
    userData: {},
    userDatas: [],
    status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUserDatas.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserDatas.fulfilled, (state, action) => {
        state.userDatas = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUserDatas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getUserData.fulfilled, (state, action) => {
        state.userData = action.payload;
        state.status = "succeeded";
      })
      .addCase(getUserData.rejected, (state, action) => {
        state.error = action.error.message;
        state.status = "failed";
      })
      .addCase(addUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(addUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDatas.push(action.payload);
      })
      .addCase(addUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(updateUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(updateUserData.fulfilled, (state, action) => {
        state.userDatas.map((userData) => {
          if (userData.id === action.payload.id) {
            userData = action.payload;        state.status = "succeeded";

          } else {
            state.status = "failed";
          }
        });
      })
      .addCase(updateUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(deleteUserData.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(deleteUserData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDatas = state.userDatas.filter(
          (userData) => userData.id !== action.payload.id
        );
      })
      .addCase(deleteUserData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Selectors
export const selectUserDatas = (state) => state.userDataList.userDatas;
export const selectUserData = (state) => state.userDataList.userData;
export const selectUserDataStatusState = (state) => state.userDataList.status;
export const selectUserDataErrorState = (state) => state.userDataList.error;

export default userDataSlice.reducer;
