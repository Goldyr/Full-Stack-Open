/* 
diagnose example
    code: "M24.2",
    name: "Disorder of ligament",
    latin: "Morbositas ligamenti",

patient example
    id: "d2773598-f723-11e9-8f0b-362b9e155667",
    name: "Martin Riggs",
    dateOfBirth: "1979-01-30",
    ssn: "300179-77A",
    gender: "male",
    occupation: "Cop",
 */
//type Gender = "male" | "female" | "other";
export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
}

export type PublicPatient = Omit<Patient, "ssn">;

export type NewPatient = Omit<Patient, "id">;
