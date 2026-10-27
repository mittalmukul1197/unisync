import { configureStore } from "@reduxjs/toolkit";
import libraryReducer from "./librarySlice";
import attendanceReducer from "./attendenceSlice";

export const store = configureStore({
  reducer: {
    library: libraryReducer,
    attendance: attendanceReducer
  }
});