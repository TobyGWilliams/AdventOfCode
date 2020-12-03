import input from "./input";

const map = input.split("\n");
const width = map[0].split("").length;

const getEveryOtherRow = (array) =>
  array.reduce(
    (previousValue, currentValue, index) =>
      index % 2 === 0 ? [...previousValue, currentValue] : previousValue,
    []
  );

const output = (stepAcross: number, stepDown: number = 1) => {
  const inputMap = stepDown === 1 ? map : getEveryOtherRow(map);

  return inputMap.reduce(
    (previousValue, row, index) =>
      row.split("")[(index * stepAcross) % width] === "#"
        ? (previousValue += 1)
        : previousValue,
    0
  );
};

const answer1 = output(1, 1);
const answer3 = output(3, 1);
const answer5 = output(5, 1);
const answer7 = output(7, 1);
const answer12 = output(1, 2);

console.log("step over 1: ", answer1);
console.log("step over 3: ", answer3);
console.log("step over 5: ", answer5);
console.log("step over 7: ", answer7);
console.log("step over 1-2: ", answer12);

console.log(
  "product of the answers:",
  answer1 * answer3 * answer5 * answer7 * answer12
);

// Right 1, down 1.
// Right 3, down 1. (This is the slope you already checked.)
// Right 5, down 1.
// Right 7, down 1.
// Right 1, down 2.
