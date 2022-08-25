import Togglable from "./Togglable";
import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogsReducer";

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch();

  const [blog_state, setBlog] = useState(blog);

  const blogStyle = {
    display: "grid",
    borderStyle: "solid",
    borderWidth: "2px",
    padding: "10px",
    margin: "3px",
  };

  const deleteButtonStyle = {
    backgroundColor: "red",
  };

  const likeHandler = (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog_state,
      likes: blog_state.likes + 1,
    };
    dispatch(updateBlog(updatedBlog));
    //Re-renders the blog with the new info
    setBlog(updatedBlog);
  };

  const deleteHandler = (event) => {
    event.preventDefault();
    dispatch(deleteBlog(blog));
  };

  return (
    <div style={blogStyle} className="Blog">
      <div>
        {blog.title} by {blog.author}
      </div>
      <div>
        <Togglable buttonLabel="info">
          <em>
            <span>Likes {blog_state.likes}</span>{" "}
            <input type="button" value="Like" onClick={likeHandler}></input>
          </em>
          <br />
          <em>{blog.url}</em>
          <br />
          <em>{blog.author}</em>
          <br />
          {user.id === blog.user.id || user.id === blog.user ? (
            <input
              type="button"
              value="Remove"
              onClick={deleteHandler}
              style={deleteButtonStyle}
              id="deleteButton"
            ></input>
          ) : (
            <input
              type="button"
              value="Remove"
              disabled={true}
              id="deleteButton"
            ></input>
          )}
          <br />
        </Togglable>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default Blog;
