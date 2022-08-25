import { useState } from "react";
import { createBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

const BlogForm = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addNewBlog = (event) => {
    event.preventDefault();
    dispatch(
      createBlog({
        title: title,
        author: author,
        url: url,
      })
    );
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  return (
    <form onSubmit={addNewBlog}>
      <div>
        Title:
        <input
          type="text"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          placeholder="title"
          id="input-title"
        ></input>
      </div>
      <div>
        Author:
        <input
          type="text"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
          placeholder="author"
          id="input-author"
        ></input>
      </div>
      <div>
        Url:
        <input
          type="text"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
          placeholder="url"
          id="input-url"
        ></input>
      </div>

      <input type="submit" value="create" id="add-blog"></input>
    </form>
  );
};

export default BlogForm;
