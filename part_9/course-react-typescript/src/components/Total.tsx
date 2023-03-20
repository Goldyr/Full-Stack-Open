import React from "react";

import { CourseParts } from "../types";

const Total = (props: CourseParts) => {
  const calculateNumberOfExercises = (): number => {
    return props.courseParts.reduce(
      (carry, part) => carry + part.exerciseCount,
      0
    );
  };
  return (
    <>
      <p>Number of exercises = {calculateNumberOfExercises()}</p>
    </>
  );
};

export default Total;
