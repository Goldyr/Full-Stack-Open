import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { updateBlog, deleteBlog } from "../reducers/blogsReducer";

import { Routes, Route, Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

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
        <Link style={{ margin: "5px" }} to={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </div>
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};

export default Blog;
