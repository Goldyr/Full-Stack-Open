import axios from "axios";
const baseUrl = "/api/blogs";
let token = null;

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const create = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
};

const update = async (updatedBlog) => {
  const response = await axios.put(baseUrl + `/${updatedBlog.id}`, updatedBlog);
  return response.data;
};

const deleteBlog = async (blogToDeleteID) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(baseUrl + `/${blogToDeleteID}`, config);
  return response.data;
};

export default { getAll, setToken, create, update, deleteBlog };
