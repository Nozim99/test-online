import {createSlice} from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: Cookies.get("token"),
    name: Cookies.get("name"),
    image: Cookies.get("image"),
  },
  reducers: {
    setUserData(state, {payload}) {
      const {token, name, image} = payload;
      state.token = token;
      state.name = name;
      state.image = image;
      Cookies.set("token", token, {expires: 7});
      Cookies.set("name", name, {expires: 7});
      Cookies.set("image", image, {expires: 7});
    },
    logOut(state) {
      state.token = "";
      state.name = "";
      state.image = "";
      Cookies.remove("token");
      Cookies.remove("name");
      Cookies.remove("image");
    },
  }
})

export const {
  setUserData,
  logOut,
} = authSlice.actions;
export default authSlice.reducer;