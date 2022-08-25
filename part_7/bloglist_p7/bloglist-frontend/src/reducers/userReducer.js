import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
import { handleNotification } from "./notificationReducer";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser(state, action) {
      const newUser = action.payload;
      return newUser;
    },
    removeUser(state, action) {
      const resetUser = {};
      return resetUser;
    },
    getUser(state, action) {
      return { ...state };
    },
  },
});

export const userLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem("LoggedUser", JSON.stringify(user));
      blogService.setToken(user.token);
      console.log(user);
      dispatch(setUser(user));
      dispatch(handleNotification(`Logged user ${user.name} correctly!`, 5));
    } catch (error) {
      console.log(error);
      dispatch(handleNotification(`ERROR:  ${error.response.data.error}`, 5));
    }
  };
};
export const userLogout = () => {
  return async (dispatch) => {
    window.localStorage.removeItem("LoggedUser");
    dispatch(setUser(null));
    dispatch(handleNotification(`Logged out!`, 5));
  };
};
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
