import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  name: "",
  isPrivate: false,
  password: "",
  data: [{
    question: "",
    a: "",
    b: "",
    c: "",
    d: "",
    answer: "",
  }],
  testNum: 0,
};

const createTest = createSlice({
  name: "createTest",
  initialState,
  reducers: {
    addTest(state) {
      state.data.push(initialState.data[0])
      state.testNum = state.data.length - 1;
    },
    removeTest(state, {payload}) {
      if (payload > 0) {
        state.testNum = payload - 1;
      } else if (state.data.length > 1) {
        state.testNum = 0;
      } else {
        state.testNum = null;
      }
      state.data.splice(payload, 1)
    },
    changeInput(state, {payload}) {
      const {index, key, value} = payload;
      state.data[index][key] = value;
    },
    changeTestNum(state, {payload}) {
      state.testNum = payload;
    },
    changeName(state, {payload}) {
      state.name = payload;
    },
    toggleIsPrivate(state, {payload}) {
      state.isPrivate = payload;
    },
    changePassword(state, {payload}) {
      state.password = payload;
    },
    clearTest(state) {
      state.name = "";
      state.isPrivate = false;
      state.password = "";
      state.data = [{
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        answer: "",
      }];
      state.testNum = 0;
    }
  }
})

export const {
  addTest,
  removeTest,
  changeInput,
  changeTestNum,
  changeName,
  toggleIsPrivate,
  changePassword,
  clearTest,
} = createTest.actions;
export default createTest.reducer;