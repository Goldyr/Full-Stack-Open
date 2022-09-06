import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { updateBlog } from "../reducers/blogsReducer";

const BlogInfo = () => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  );

  const likeHandler = (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    dispatch(updateBlog(updatedBlog));
  };

  const commentHandler = (event) => {
    event.preventDefault();
    const updatedBlog = {
      ...blog,
      comments: [...blog.comments, comment],
    };
    dispatch(updateBlog(updatedBlog));
    setComment("");
  };

  if (blog)
    return (
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a>{blog.url}</a>
        <p>
          {blog.likes} Likes{" "}
          <input type="button" value="Like" onClick={likeHandler}></input>
        </p>
        <h4>Comments:</h4>
        <form onSubmit={commentHandler}>
          <input
            type="text"
            value={comment}
            onChange={(event) => {
              setComment(event.target.value);
            }}
          ></input>
          <button>Comment</button>
        </form>

        {blog.comments.length > 0 ? (
          <ul>
            {blog.comments.map((comment, i) => {
              return <li key={i}>{comment}</li>;
            })}
          </ul>
        ) : (
          <div>No comments..</div>
        )}
      </div>
    );
};

export default BlogInfo;
