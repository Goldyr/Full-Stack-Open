import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_AUTHORS, ALL_BOOKS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS);
  const [selected, setSelected] = useState("");

  const onSelectedClick = (event) => {
    event.preventDefault();
    setSelected(event.target.innerText);
    console.log("clicked", event.target.innerText);
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>loading...</div>;
  }

  if (result.error) {
    return <div>Error connecting to the graphql database</div>;
  }

  const authors = result.data.allAuthors;
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td onClick={onSelectedClick}>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <AuthorBirthForm name={selected} />
    </div>
  );
};

const AuthorBirthForm = ({ name }) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      console.error(error);
    },
  });

  const submitHandler = (event) => {
    event.preventDefault();
    console.log(name, event.target.born.value);
    editAuthor({
      variables: {
        name,
        born: Number(event.target.born.value),
      },
    });
    event.target.born.value = "";
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        name: {name ? name : "please click the name of the author to change"}
        <br />
        born: <input id="born" type="number"></input>
        <br />
        <button type="submit">EDIT</button>
      </form>
    </div>
  );
};

export default Authors;
