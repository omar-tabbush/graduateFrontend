import { configureStore } from "@reduxjs/toolkit";
import designListReducer from "./slices/designSlice";
import authenticationReducer from "./slices/authSlice";
import userListReducer from "./slices/userSlice";
import userDataListReducer from "./slices/userDataSlice";

export const store = configureStore({
  reducer: {
    designList: designListReducer,
    userDataList: userDataListReducer,
    userList: userListReducer,
    isAuth: authenticationReducer,
  },
});
