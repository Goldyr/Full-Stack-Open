import React from "react";
import Part from "./Part";

import { CourseParts } from "../types";

const Content = (props: CourseParts): JSX.Element => {
  return (
    <>
      {props.courseParts.map((part, i) => {
        return <Part part={part} index={i} key={i} />;
      })}
    </>
  );
};

export default Content;
