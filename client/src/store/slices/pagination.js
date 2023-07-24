import {createSlice} from "@reduxjs/toolkit";

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    isTestCreated: false,
    isTestDeleted: false,
    isCreatedFirstTest: false,
    nextTest: false,
    prevTest: false,
  },
  reducers: {
    changeIsCreated(state, {payload}) {
      state.isTestCreated = payload
    },

    changeIsDeleted(state, {payload}) {
      state.isTestDeleted = payload
    },

    changeNextTest(state, {payload}){
      state.nextTest = payload;
    },

    changePrevTest(state, {payload}){
      state.prevTest = payload;
    },

    changeIsCreatedFirstTest(state, {payload}){
      state.isCreatedFirstTest = payload;
    }
  }
})

export const {
  changeIsCreated,
  changeIsDeleted,
  changeNextTest,
  changePrevTest,
  changeIsCreatedFirstTest,
} = paginationSlice.actions;

export default paginationSlice.reducer;