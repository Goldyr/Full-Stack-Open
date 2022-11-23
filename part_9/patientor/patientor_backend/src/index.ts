import express from "express";
import cors from "cors";

import diagnoseRouter from "./routes/diagnoseRouter";
import patientRouter from "./routes/patientRouter";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/diagnoses", diagnoseRouter);
app.use("/api/patients", patientRouter);

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});

app.listen(PORT, () => {
  console.log(`Listening port ${PORT}`);
});
