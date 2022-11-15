//INPUT: TARGET then an ARRAY of hours exercised for the day
// Determine if its being run by command arguments
// If it is then parse it acordingly
/* output
the number of days
the number of training days
the original target value
the calculated average time
boolean value describing if the target was reached
a rating between the numbers 1-3 that tells how well the hours are met. You can decide on the metric on your own.
a text value explaining the rating
*/
type Rating = {
  rating: 1 | 2 | 3;
  ratingDescription: string;
};

interface Result {
  periodLength: number;
  numberTrainingDays: number;
  targetValue: number;
  averageTime: number;
  reached: boolean;
  rating: number;
  ratingDescription: string;
}

export interface RoutineValues {
  daysArray: Array<number>;
  target: number;
}

export const checkRoutineValues = (
  target: number,
  args: Array<string> | Array<number>
): RoutineValues => {
  if (args instanceof Array<string>) {
    args.map((a, i) => {
      if (isNaN(Number(a)) && i !== 0 && i !== 1) {
        throw new Error("Arguments need to be numbers");
      }
    });
  }

  const daysArray = args.map((a) => Number(a));

  return {
    daysArray,
    target,
  };
};

export const calculateExercise = ({
  daysArray,
  target,
}: RoutineValues): Result => {
  //TODO
  const filterTrainingDays = (): number => {
    const trainingDays = daysArray.filter((d) => d !== 0).length;
    return trainingDays;
  };

  const calculateAverage = (): number => {
    let sum = 0;
    daysArray.map((d) => (sum += d));

    return sum / daysArray.length;
  };

  const calculateRating = (average: number): Rating => {
    if (average >= target)
      return {
        rating: 3,
        ratingDescription: "Reached your target!",
      };
    else if (target - average < 1)
      return {
        rating: 2,
        ratingDescription: "Really close to your target try a little harder!",
      };
    else {
      return {
        rating: 1,
        ratingDescription: "You need to try harder to reach your target!",
      };
    }
  };

  const average = calculateAverage();

  const rating: Rating = calculateRating(average);

  const result: Result = {
    periodLength: daysArray.length,
    numberTrainingDays: filterTrainingDays(),
    averageTime: average,
    rating: rating.rating,
    ratingDescription: rating.ratingDescription,
    reached: average >= target ? true : false,
    targetValue: target,
  };
  return result;
};

const parseCLargs = (array: Array<string>): Array<number> | Array<string> => {
  return array.filter((_a, i) => i !== 0 && i !== 1 && i !== 2);
};

//main
if (process.argv.length > 4)
  try {
    const daysArray = parseCLargs(process.argv);
    console.log(
      calculateExercise(checkRoutineValues(Number(process.argv[2]), daysArray))
    );
  } catch (error: unknown) {
    console.log("Something went wrong");

    if (error instanceof Error) {
      console.log(`Error: ${error.message}`);
    }
  }
