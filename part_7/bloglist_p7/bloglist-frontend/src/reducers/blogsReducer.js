import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import { handleNotification } from "./notificationReducer";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    addBlog(state, action) {
      const newBlog = action.payload;
      const newState = state.concat(newBlog);
      return newState;
    },
    setBlogs(state, action) {
      const blogsArray = action.payload;
      return blogsArray;
    },
    //Updates all blogs, called in case some blog was updated
    updateBlogs(state, action) {
      const blogToUpdate = action.payload;
      const updatedBlogs = state.map((b) =>
        b.id !== blogToUpdate.id ? b : blogToUpdate
      );
      return updatedBlogs;
    },
    //removes a blog with a specific id from the array
    removeBlog(state, action) {
      const filteredBlogs = state.filter(
        (blog) => blog.id !== action.payload.id
      );
      return filteredBlogs;
    },
  },
});

export const getBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogService.getAll();
      dispatch(setBlogs(blogs));
    } catch (error) {
      console.error(error);
    }
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(blog);
      console.log(response);
      dispatch(addBlog(response));
      dispatch(
        handleNotification(
          `New blog ${response.title} by ${response.author} added`,
          5
        )
      );
    } catch (error) {
      console.log(error.response.data);
      dispatch(handleNotification(`ERROR:  ${error.response.data.error}`, 5));
    }
  };
};

//Updates blogs in the db
export const updateBlog = (blog) => {
  return async (dispatch) => {
    try {
      const blogToUpdate = await blogService.update(blog);
      dispatch(updateBlogs(blogToUpdate));
      dispatch(handleNotification(`Updated ${blogToUpdate.title}`, 5));
    } catch (error) {
      console.log(error);
      dispatch(handleNotification(`ERROR:  ${error}`, 5));
    }
  };
};

export const deleteBlog = (blogToDelete) => {
  return async (dispatch) => {
    if (
      window.confirm(
        `Remove blog ${blogToDelete.title} by ${blogToDelete.author}`
      )
    ) {
      try {
        await blogService.deleteBlog(blogToDelete.id);
        dispatch(removeBlog(blogToDelete));
        dispatch(handleNotification(`Blog deleted`, 5));
      } catch (error) {
        console.log(error);
        dispatch(handleNotification(`ERROR:  ${error}`, 5));
      }
    }
  };
};

export const { addBlog, setBlogs, updateBlogs, removeBlog } = blogSlice.actions;
export default blogSlice.reducer;
