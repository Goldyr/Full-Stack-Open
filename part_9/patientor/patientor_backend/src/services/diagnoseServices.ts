import diagnoses from "../data/diagnoses";
import { Diagnose } from "../types";

export const getDiagnoses = (): Diagnose[] => {
  return diagnoses;
};

export default { getDiagnoses };
