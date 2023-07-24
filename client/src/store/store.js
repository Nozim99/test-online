import {configureStore} from "@reduxjs/toolkit";
import createTest from "./slices/createTest.js";
import pagination from "./slices/pagination.js";
import authSlice from "./slices/authSlice.js";
import testSlice from "./slices/testSlice.js";

export const store = configureStore({
  reducer: {
    createTest,
    pagination,
    auth: authSlice,
    test: testSlice,
  }
})