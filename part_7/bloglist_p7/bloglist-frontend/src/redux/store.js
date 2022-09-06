import { configureStore } from "@reduxjs/toolkit";

//import reducers
import notificationReducer from "../reducers/notificationReducer";
import blogsReducer from "../reducers/blogsReducer";
import userReducer from "../reducers/userReducer";
import usersReducer from "../reducers/usersReducer";

const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
});

export default store;
