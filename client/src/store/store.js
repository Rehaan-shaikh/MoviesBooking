import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice/index.js"; 
import showReducer from "./showSlice/index.js";
const store = configureStore({
  reducer: {
    auth: authReducer,
    shows: showReducer,
  },
});

export default store;
