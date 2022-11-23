import express from "express";
import { getDiagnoses } from "../services/diagnoseServices";

export const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getDiagnoses()).end();
});

export default router;
