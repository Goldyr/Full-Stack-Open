import { patientsList } from "../data/patients";
import { NewPatient, PublicPatient } from "../types";
import { v4 as uuid } from "uuid";

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

  patientsList.push(newPatient);
  return newPatient;
};

export default { getPatientsPublicInfo, addPatient };
