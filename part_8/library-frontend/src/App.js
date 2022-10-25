import { useState } from "react";
import { decodeToken } from "react-jwt";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Login from "./components/Login";
import Recomended from "./components/Recomended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);

  if (token) {
    const user = decodeToken(token);

    localStorage.setItem("user_values", JSON.stringify(user));
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    setPage("authors");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>

        {token === null ? (
          <>
            <button onClick={() => setPage("login")}>login</button>
          </>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommended")}>recommended</button>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
      </div>

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add"} />

      <Login show={page === "login"} setToken={setToken} setPage={setPage} />

      <Recomended show={page === "recommended"} />
    </div>
  );
};

export default App;
