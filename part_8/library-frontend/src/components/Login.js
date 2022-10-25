import React from "react";
/* import { tokenToUser } from "../utilities/token"; */
import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../queries";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.error(error);
      props.setPage("login");
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      props.setToken(token);
      localStorage.setItem("user_token", token);
    }
  }, [result.data]); //eslint-disable-line

  const submitHandler = (event) => {
    event.preventDefault();

    login({ variables: { username, password } });

    setPassword("");
    setUsername("");

    props.setPage("authors");
  };

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={(event) => submitHandler(event)}>
        <div>
          username:
          <input
            id="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          ></input>
        </div>
        <div>
          password:
          <input
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          ></input>
        </div>

        <button> LOGIN </button>
      </form>
    </div>
  );
};

export default Login;
