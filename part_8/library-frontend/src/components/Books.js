import { useQuery } from "@apollo/client";
import { BOOKS_FILTERED } from "../queries";
import { useState } from "react";
import Filter from "../components/Filter";
import BooksTable from "./BooksTable";

const Books = (props) => {
  const [filter, setFilter] = useState("");

  /* const result = useQuery(ALL_BOOKS); */
  const result = useQuery(BOOKS_FILTERED, { variables: { genre: filter } });

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

  return (
    <div>
      <h2>books</h2>
      <BooksTable books={books} />
      <Filter setFilter={setFilter}></Filter>
    </div>
  );
};

export default Books;
