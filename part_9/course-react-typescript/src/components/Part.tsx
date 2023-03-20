import React from "react";
import { CoursePart } from "../types";
import { assertNever } from "../utils";

const Part = ({
  part,
  index,
}: {
  part: CoursePart;
  index: string | number;
}): JSX.Element => {
  {
    switch (part.type) {
      case "normal":
        return (
          <p key={index}>
            <b>{part.name}</b>
            <br />
            {part.exerciseCount}
            <br />
            {part.description}
          </p>
        );
      case "groupProject":
        return (
          <p key={index}>
            <b>{part.name}</b>
            <br />
            {part.exerciseCount}
            <br />
            {part.groupProjectCount}
          </p>
        );
      case "submission":
        return (
          <p key={index}>
            <b>{part.name}</b>
            <br />
            {part.exerciseCount}
            <br />
            {part.description}
            <br />
            {part.exerciseSubmissionLink}
          </p>
        );

      case "special":
        return (
          <div key={index}>
            <b>{part.name}</b>
            <br />
            {part.exerciseCount}
            <br />
            {part.description}
            <br />
            {JSON.stringify(part.requirements)}
          </div>
        );
      default:
        assertNever(part);
        return <div></div>;
    }
  }
};

export default Part;
