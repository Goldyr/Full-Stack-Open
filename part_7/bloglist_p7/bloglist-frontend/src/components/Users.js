import React from "react";

import { Routes, Route, Link } from "react-router-dom";
import UserInfo from "./UserInfo";

import Table from "react-bootstrap/Table";

import { useSelector } from "react-redux";

const Users = () => {
  const users = useSelector((state) => state.users);

  if (Object.keys(users).length > 0) {
    return (
      <div>
        <h3>Users</h3>

        <Table bordered hover>
          <thead>
            <tr>
              <th>name</th>
              <th>n of blogs</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>
                    <Link style={{ margin: "5px" }} to={`${user.id}`}>
                      {user.name}
                    </Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  } else return <div>no users</div>;
};

export default Users;
