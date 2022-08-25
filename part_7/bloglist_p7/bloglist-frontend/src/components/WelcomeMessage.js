import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../reducers/userReducer";

const WelcomeMessage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  return (
    <div>
      User {user.name} logged in
      <input
        type="button"
        onClick={handleLogOut}
        value="Log Out"
        id="logout-button"
      ></input>
    </div>
  );
};
export default WelcomeMessage;
