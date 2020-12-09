import questionData from "./question-data";

const sampleInput = [
  35,
  20,
  15,
  25,
  47,
  40,
  62,
  55,
  65,
  95,
  102,
  117,
  150,
  182,
  127,
  219,
  299,
  277,
  309,
  576,
];

const parsedData = questionData.split("\n");
const reparsedData = [];

for (let i = 0; i < parsedData.length; i++) {
  reparsedData.push(Number(parsedData[i]));
}

const findMatchingPair = (valueToSumTo: number, previousElements: number[]) => {
  for (let i = 0; i < previousElements.length; i++) {
    const firstElement = previousElements[i];
    for (let j = i + 1; j < previousElements.length; j++) {
      const secondElement = previousElements[j];
      if (firstElement + secondElement === valueToSumTo) {
        return [firstElement, secondElement, i, j];
      }
    }
  }
};

const findMissingPair = (array, offset) => {
  for (let i = offset; i < array.length; i++) {
    const element = array[i];

    if (!findMatchingPair(element, array.slice(i - offset, i))) return element;
  }
};

const getStuff = (valueToSumTo, array) => {
  let runningTotal = 0;
  for (let i = 0; i < array.length; i++) {
    runningTotal += array[i];
    if (runningTotal >= valueToSumTo) {
      return [i, runningTotal === valueToSumTo, runningTotal];
    }
  }
};

const findContiguousSet = (valueToSumTo: number, array: number[]) => {
  for (let minIndex = 0; minIndex < array.length; minIndex++) {
    const [maxIndex, matched] = getStuff(
      valueToSumTo,
      array.slice(minIndex, array.length)
    );

    if (matched) {
      const values = array.slice(minIndex, minIndex + maxIndex + 1);
      return Math.min(...values) + Math.max(...values);
    }
  }
};

const invalidNumber = findMissingPair(reparsedData, 25);
const output = findContiguousSet(invalidNumber, reparsedData);

console.log(output);

// console.log();
// console.log(findMissingPair(reparsedData, 25));
