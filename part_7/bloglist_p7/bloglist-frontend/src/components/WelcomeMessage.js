import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../reducers/userReducer";

import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

const WelcomeMessage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogOut = (event) => {
    event.preventDefault();
    dispatch(userLogout());
  };

  return (
    <Navbar.Text>
      User {user.name} logged in
      <Button
        variant="secondary"
        as="input"
        type="button"
        onClick={handleLogOut}
        value="Log Out"
        id="logout-button"
      ></Button>
    </Navbar.Text>
  );
};
export default WelcomeMessage;
