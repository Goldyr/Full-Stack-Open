import { createSlice } from "@reduxjs/toolkit";

let timeout_id;

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    updateNotification(state, action) {
      const newNotification = action.payload;
      return newNotification;
    },
    resetNotification(state, action) {
      const emptyNotification = "";
      return emptyNotification;
    },
  },
});

export const handleNotification = (message, seconds) => {
  return (dispatch) => {
    clearTimeout(timeout_id);
    dispatch(updateNotification(message));
    timeout_id = setTimeout(() => {
      dispatch(resetNotification());
    }, seconds * 1000);
  };
};

export const { updateNotification, resetNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
