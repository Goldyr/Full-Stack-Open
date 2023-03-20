import { patientsList } from "../data/patients";
import { Entry, NewEntry, NewPatient, Patient, PublicPatient } from "../types";
import { v4 as uuid } from "uuid";
import { toNewEntry } from "../utils";

export const getPatientsPublicInfo = (): PublicPatient[] => {
  return patientsList.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (patient: NewPatient): PublicPatient => {
  const newPatient: PublicPatient = {
    id: uuid(),
    ...patient,
  };

  //Temporal fix: Entries forced as a empty array
  patientsList.push({ ...newPatient, entries: [] });
  return newPatient;
};

export const getPatient = (id: string): Patient => {
  const patient = patientsList.find((patient) => patient.id === id);
  if (!patient || typeof patient === undefined) {
    throw new Error("Id not found");
  }
  return patient;
};

export const updatePatient = (patient: Patient): void => {

  patientsList.map(p => {
  p.id === patient.id ? patient : p
  }
  )
};

export const addEntry = (entry: NewEntry): Entry => {

    const newEntry =  {
      id: uuid(),
      ...entry
    };

    return toNewEntry(newEntry)

}

export default { getPatientsPublicInfo, addPatient, getPatient };
