import express from "express";
const app = express();

import { calculateExercise, checkRoutineValues } from "./exerciseCalculator";

app.use(express.json());

import { calculateBmi, parseValues } from "./bmiCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  let bmi;
  try {
    bmi = calculateBmi(
      parseValues(String(req.query.height), String(req.query.weight))
    );
    res
      .send({
        height: String(req.query.height),
        weight: String(req.query.weight),
        bmi,
      })
      .end();
  } catch (error: unknown) {
    const message = "Something went wrong. ";
    if (error instanceof Error) {
      console.log("\n" + error.message);
      res.send({ error: error.message }).end();
    } else {
      res.send({ error: message }).end();
    }
  }
});

app.post("/exercises", (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { daily_exercises, target } = req.body;
    console.log(req.body);
    if (!daily_exercises || !target) {
      throw new Error("parameters missing");
    }
    if (isNaN(Number(target))) {
      throw new Error("malformated parameters");
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const routine = checkRoutineValues(Number(target), daily_exercises);
    const result = calculateExercise(routine);

    res.send(result);
  } catch (error: unknown) {
    console.log("Something went wrong");
    res.status(400).end();

    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
