import { useState } from "react";
import { createBlog } from "../reducers/blogsReducer";
import { useDispatch } from "react-redux";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
    <Form onSubmit={addNewBlog} style={{ margin: "10px" }}>
      <div>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={({ target }) => {
            setTitle(target.value);
          }}
          placeholder="title"
          id="input-title"
        ></Form.Control>
      </div>
      <div>
        <Form.Label>Author:</Form.Label>
        <Form.Control
          type="text"
          value={author}
          onChange={({ target }) => {
            setAuthor(target.value);
          }}
          placeholder="author"
          id="input-author"
        ></Form.Control>
      </div>
      <div>
        <Form.Label>Url::</Form.Label>
        <Form.Control
          type="text"
          value={url}
          onChange={({ target }) => {
            setUrl(target.value);
          }}
          placeholder="url"
          id="input-url"
        ></Form.Control>
      </div>

      <Button
        as="input"
        type="submit"
        value="create"
        id="add-blog"
        style={{ marginTop: "10px" }}
      ></Button>
    </Form>
  );
};

export default BlogForm;
