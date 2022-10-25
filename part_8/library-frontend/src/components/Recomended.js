import React from "react";
import { useQuery } from "@apollo/client";
import { BOOKS_FILTERED } from "../queries";
import BooksTable from "./BooksTable";

const Recomended = (props) => {
  /* const result = useQuery(ALL_BOOKS); */

  let genre = "";
  const user = JSON.parse(localStorage.getItem("user_values"));

  if (user) genre = user.favouriteGenre;

  const result = useQuery(BOOKS_FILTERED, {
    variables: { genre: genre },
  });

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>Error connecting to the graphql database</div>;
  }

  let books = result.data.allBooks;

  /*   if (user.favouriteGenre) {
    books = books.filter((b) => b.genres.includes(user.favouriteGenre));
  } */

  return (
    <div>
      <h3>Recommendations</h3>
      <div>Books in your favorite genre: {user.favouriteGenre}</div>
      <BooksTable books={books} />
    </div>
  );
};

export default Recomended;
