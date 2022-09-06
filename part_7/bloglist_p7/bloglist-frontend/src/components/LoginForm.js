import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { userLogin } from "../reducers/userReducer";
import { useDispatch } from "react-redux";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (event) => {
    event.preventDefault();
    dispatch(userLogin(username, password));
    setUsername("");
    setPassword("");
    navigate("/blogs");
  };

  return (
    <Form onSubmit={loginHandler} id="loginForm">
      <Form.Group>
        <Form.Label>username:</Form.Label>
        <Col sm="10">
          <Form.Control
            className="w-50"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => {
              setUsername(target.value);
            }}
            id="username"
            placeholder="Username"
          />
        </Col>
      </Form.Group>
      <Form.Group>
        <Form.Label>password:</Form.Label>

        <Col sm="10">
          <Form.Control
            className="w-50"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
            id="password"
            placeholder="Password"
          />
        </Col>
      </Form.Group>

      <Button style={{ marginTop: "10px" }} type="submit">
        LOGIN
      </Button>
    </Form>
  );
};

export default LoginForm;
