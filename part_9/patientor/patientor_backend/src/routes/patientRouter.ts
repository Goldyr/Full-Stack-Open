import express from "express";
import {
  getPatientsPublicInfo,
  addPatient,
  getPatient,
  addEntry,
  updatePatient,
} from "../services/patientServices";
import { Entry, NewPatient } from "../types";
import {toNewPatient} from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getPatientsPublicInfo()).end();
});

router.get("/:id", (req, res) => {
  try {
    const id: string = req.params.id;
    res.send(getPatient(id)).end();
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
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

router.post("/:id/entries", (req, res) => {
  try{
    const newEntry: Entry = addEntry(req.body);
    const patientToUpdate = getPatient(req.params.id);
    patientToUpdate.entries?.push(newEntry)
    updatePatient(patientToUpdate)

    res.status(200).json(patientToUpdate)
  }
  catch (error) {
    let errorMessage = "Something went wrong.";
    if(error instanceof Error) {
      errorMessage += "Error: " + error.message;
    }
    res.status(400).send(errorMessage)
  }
});

export default router;
