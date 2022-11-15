type HealthChart = "underweight" | "normal" | "overweight" | "obese";

export const parseValues = (
  cm: string,
  kg: string
): { cm: number; kg: number } => {
  if (!isNaN(Number(cm)) && !isNaN(Number(kg))) {
    return {
      cm: Number(cm),
      kg: Number(kg),
    };
  } else throw new Error("One or both arguments were not numbers");
};

const determineHealth = (bmi: number): HealthChart => {
  if (bmi < 16) {
    return "underweight";
  } else if (bmi < 25) {
    return "normal";
  } else if (bmi < 30) {
    return "overweight";
  } else {
    return "obese";
  }
};

export const calculateBmi = ({
  cm,
  kg,
}: {
  cm: number;
  kg: number;
}): string => {
  const m2: number = Math.pow(cm / 100, 2);

  const bmi: number = Math.ceil(kg / m2);

  const resultMessage = `Your BMI is ${bmi}, your weight is considered `;

  switch (determineHealth(bmi)) {
    case "underweight":
      return resultMessage + "underweight";
    case "normal":
      return resultMessage + "normal / healthy";
    case "overweight":
      return resultMessage + "overweight";
    case "obese":
      return resultMessage + "obese";
  }
};

//main
if (process.argv.length === 4) {
  try {
    console.log(calculateBmi(parseValues(process.argv[2], process.argv[3])));
  } catch (error: unknown) {
    console.log("Something went wrong");
    if (error instanceof Error) {
      console.log("\n" + error.message);
    }
    console.log(
      "First input should be your height in cm and the second your weigth in kg"
    );
  }
}
