import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import BlogList from "./components/BlogList";
import WelcomeMessage from "./components/WelcomeMessage";
import Users from "./components/Users";
import UserInfo from "./components/UserInfo";
import BlogInfo from "./components/BlogInfo";

import blogService from "./services/blogs";

import { setUser } from "./reducers/userReducer";
import { getUsers } from "./reducers/usersReducer";
import { getBlogs } from "./reducers/blogsReducer";

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("LoggedUser");
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      dispatch(setUser(loggedUser));
      blogService.setToken(loggedUser.token);
    }
  }, []);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  return (
    <Container>
      <Router>
        <Navbar>
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link
                style={{ margin: "5px", textDecoration: "none" }}
                to="/users"
              >
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link
                style={{ margin: "5px", textDecoration: "none" }}
                to="/blogs"
              >
                blogs
              </Link>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#" as="span">
              {!user ? (
                <Link
                  style={{
                    margin: "5px",
                    textDecoration: "none",
                    fontSize: "1.5rem",
                  }}
                  to="/login"
                >
                  LOGIN
                </Link>
              ) : (
                <WelcomeMessage />
              )}
            </Nav.Link>
          </Nav>
        </Navbar>

        <h2>BLOGS</h2>
        <Notification></Notification>

        <Routes>
          <Route
            path="/"
            element={
              <div>
                Welcome to my simple blog website, use the navbar on top to
                navigate the website
              </div>
            }
          />
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<UserInfo />}></Route>
          <Route path="/blogs/:id" element={<BlogInfo />}></Route>
          <Route path="/login" element={<LoginForm />}></Route>
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
