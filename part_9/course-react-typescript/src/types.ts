interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}

interface DescriptionCoursePartBase extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends DescriptionCoursePartBase {
  type: "normal";
}

interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends DescriptionCoursePartBase {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends DescriptionCoursePartBase {
  type: "special";
  requirements: string[];
}

export type CoursePart =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseSpecialPart;

export interface CourseParts {
  courseParts: CoursePart[];
}
