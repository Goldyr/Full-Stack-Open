import React from "react";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserInfo = () => {
  const id = useParams().id;
  const users = useSelector((state) => state.users);
  const user = users.find((user) => user.id === id);

  if (!user) {
    return null;
  }
  return (
    <div>
      <ul>
        {user.blogs.map((blog, i) => {
          return <li key={i}>{blog.title}</li>;
        })}
      </ul>
    </div>
  );
};

export default UserInfo;
