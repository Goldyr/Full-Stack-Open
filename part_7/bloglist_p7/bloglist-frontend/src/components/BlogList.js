import React, { useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import ListGroup from "react-bootstrap/ListGroup";

import Togglable from "./Togglable";
import BlogForm from "./BlogForm";

const BlogList = () => {
  const dispatch = useDispatch();

  const blogs = [...useSelector((state) => state.blogs)];
  const user = useSelector((state) => state.user);

  const blogFormRef = useRef();

  if (blogs) {
    return (
      <>
        {user ? (
          <Togglable
            buttonLabel="create blog"
            ref={blogFormRef}
            buttonId="create-button"
          >
            <BlogForm />
          </Togglable>
        ) : (
          <div></div>
        )}
        <ListGroup>
          {blogs
            //Ordered by most liked
            .sort((blog1, blog2) => {
              if (blog1.likes > blog2.likes) {
                return -1;
              } else {
                return 1;
              }
            })
            .map((blog) => (
              <ListGroup.Item key={blog.id} style={{ margin: "5px" }}>
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </>
    );
  } else return <div>no blogs</div>;
};

export default BlogList;
