import {createSlice} from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "test",
  initialState: {
    url: "",
  },
  reducers: {
    changeUrl(state, {payload}) {
      state.url = payload;
    }
  }
})

export const {
  changeUrl,
} = testSlice.actions;
export default testSlice.reducer;