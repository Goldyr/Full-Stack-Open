import express from "express";
import { getPatientsPublicInfo, addPatient } from "../services/patientServices";
import { NewPatient } from "../types";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatientsPublicInfo()).end();
});

router.post("/", (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);

    const addedPatient = addPatient(newPatient);
    res.json(addedPatient).end();
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
