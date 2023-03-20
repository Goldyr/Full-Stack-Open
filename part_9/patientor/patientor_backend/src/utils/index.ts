import { Diagnose, Entry, Gender, healthCheckRating, NewPatient } from "../types";

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

//Works for checking name/occupation
const parseSimpleString = (param: unknown): string => {
  if (!param || !isString(param))
    throw new Error("Incorrect or missing string");
  return param;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseBirth = (birthDate: unknown): string => {
  if (!isString(birthDate) || !birthDate || !isDate(birthDate)) {
    throw new Error("Incorrect or missing date");
  }
  return birthDate;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || ssn.length < 9) {
    throw new Error("Incorrect or missing ssn");
  }
  return ssn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatient = (object: any): NewPatient => {
  const newPatient: NewPatient = {
    name: parseSimpleString(object.name),
    dateOfBirth: parseBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseSimpleString(object.occupation),
    entries: object.entries as Entry[],
  };
  return newPatient;
};

export const toNewEntry = (object: any): Entry => {
  
  switch(object.type){
    case "HealthCheck":
    const newEntryHC: Entry = {
      id: parseSimpleString(object.id),
      description: parseSimpleString(object.description),
      date: parseSimpleString(object.date),
      specialist: parseSimpleString(object.specialist),
      diagnosisCodes: object.diagnosisCodes as Array<Diagnose["code"]>,
      type: "HealthCheck",
      healthCheckRating: object.healthCheckRating as healthCheckRating
    }
    return newEntryHC

    case "OccupationalHealthcare":
      const newEntryOH: Entry = {
        id: parseSimpleString(object.id),
        description: parseSimpleString(object.description),
        date: parseSimpleString(object.date),
        specialist: parseSimpleString(object.specialist),
        diagnosisCodes: object.diagnosisCodes as Array<Diagnose["code"]>,
        type: "OccupationalHealthcare",
        employerName: parseSimpleString(object.employerName),
        sickLeave: object.sickLeave,
      }
    return newEntryOH

    case "Hospital":
      const newEntryH: Entry = {
        id: parseSimpleString(object.id),
        description: parseSimpleString(object.description),
        date: parseSimpleString(object.date),
        specialist: parseSimpleString(object.specialist),
        diagnosisCodes: object.diagnosisCodes as Array<Diagnose["code"]>,
        type: "Hospital",
        discharge: object.discharge,
      }
    return newEntryH

    default:
      throw new Error("Error parsing entry: " + JSON.stringify(object));

    }
    
};

export default {toNewPatient, toNewEntry};
