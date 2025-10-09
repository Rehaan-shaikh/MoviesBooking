import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js"; 
import showReducer from "./admin/show-slice/index.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    shows: showReducer,
  },
});

export default store;
