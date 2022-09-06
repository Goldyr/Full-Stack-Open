import { createSlice } from "@reduxjs/toolkit";
import userService from "../services/users";

//Array of users on the db

const usersSlice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    setUser(state, action) {
      const user = action.payload;
      const newState = state.concat(user);
      return newState;
    },
    setUsers(state, action) {
      const usersArray = action.payload;
      return usersArray;
    },
  },
});

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      console.error(error);
    }
  };
};

export const { setUsers, setUser } = usersSlice.actions;
export default usersSlice.reducer;
