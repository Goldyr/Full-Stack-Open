import React from "react";

const Filter = ({ setFilter }) => {
  return (
    <div>
      <button onClick={() => setFilter("refactoring")}>refactoring</button>
      <button onClick={() => setFilter("agile")}>agile</button>
      <button onClick={() => setFilter("patterns")}>patterns</button>
      <button onClick={() => setFilter("design")}>design</button>
      <button onClick={() => setFilter("crime")}>crime</button>
      <button onClick={() => setFilter("classic")}>classic</button>
      <button onClick={() => setFilter("")}>all genres</button>
    </div>
  );
};

export default Filter;
