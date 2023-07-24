import {createSlice} from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: {
    password: ""
  },
  reducers: {
    changePassword(state, {payload}) {
      state.password = payload;
    }
  }
})

export const {changePassword} = testSlice.actions;
export default testSlice.reducer;