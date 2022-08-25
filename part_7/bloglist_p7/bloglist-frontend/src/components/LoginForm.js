import { useState } from "react";

import { userLogin } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();
    dispatch(userLogin(username, password));
    setUsername("");
    setPassword("");
  };

  return (
    <form onSubmit={loginHandler} id="loginForm">
      <div>
        username :
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          id="username"
        />
      </div>
      <div>
        password :
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          id="password"
        />
      </div>
      <button type="submit">LOGIN</button>
    </form>
  );
};

export default LoginForm;
