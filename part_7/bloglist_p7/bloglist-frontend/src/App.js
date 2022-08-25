import { useEffect, useRef } from "react";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogList from "./components/BlogList";
import WelcomeMessage from "./components/WelcomeMessage";
import blogService from "./services/blogs";

import { useDispatch, useSelector } from "react-redux";
import { setUser, userLogout } from "./reducers/userReducer";

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

  const blogFormRef = useRef();

  const loggedForm = () => (
    <div>
      <h2>blogs</h2>
      <WelcomeMessage />
      <Togglable
        buttonLabel="create blog"
        ref={blogFormRef}
        buttonId="create-button"
      >
        <BlogForm />
      </Togglable>
      <BlogList user={user} />
    </div>
  );

  return (
    <div>
      <Notification></Notification>

      <div>{!user ? <LoginForm /> : loggedForm()}</div>
    </div>
  );
};

export default App;
