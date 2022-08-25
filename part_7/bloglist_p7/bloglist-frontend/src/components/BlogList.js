import React, { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { getBlogs } from "../reducers/blogsReducer";

import Blog from "../components/Blog";

const BlogList = ({ user }) => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    dispatch(getBlogs());
  }, [dispatch]);

  /*   useEffect(() => {
    blogs.sort((blog1, blog2) => {
      if (blog1.likes > blog2.likes) {
        return -1;
      } else {
        return 1;
      }
    });
  }, [blogs]); */

  if (blogs) {
    return (
      <>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <Blog blog={blog} user={user} />
          </div>
        ))}
      </>
    );
  } else return <div>no blogs</div>;
};

export default BlogList;
