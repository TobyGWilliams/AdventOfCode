import questionData from "./question-data";

console.time("start");

const getSortedInput = (data: string) => [
  0,
  ...data
    .split("\n")
    .map((x) => Number(x))
    .sort((a, b) => a - b),
];

const getCountOfNumbers = (data: string) =>
  getSortedInput(data)
    .flatMap((value, index, array) => {
      if (index === 0) return [value];
      if (index === array.length - 1) return [value - array[index - 1], 3];
      return [value - array[index - 1]];
    })
    .reduce(
      (
        [countOfNumberOnes, countOfNumberTwos, countOfNumberThrees],
        currentValue
      ) => [
        currentValue === 1 ? countOfNumberOnes + 1 : countOfNumberOnes,
        currentValue === 2 ? countOfNumberTwos + 1 : countOfNumberTwos,
        currentValue === 3 ? countOfNumberThrees + 1 : countOfNumberThrees,
      ],
      [0, 0, 0]
    );

const [countOfOnes, , countOfThrees] = getCountOfNumbers(questionData);

console.log(`\nPart 1: ${countOfOnes * countOfThrees}`);

const reverseRecursionReducer = ([runningArray], pathMap, index, array) => {
  if (pathMap.length === 0) {
    return [[1], 1];
  }

  const newTotalOfPaths = pathMap.reduce(
    (previous, path) => previous + runningArray[array.length - 1 - path],
    0
  );

  return [[...runningArray, newTotalOfPaths], newTotalOfPaths];
};

const getNumberOfPaths = (data: number[]) =>
  data
    .map((current, index, array) =>
      [index + 1, index + 2, index + 3].filter(
        (index) => array[index] - current <= 3
      )
    )
    .reduceRight(reverseRecursionReducer, [[], 0])[1];

const parsedInput = getSortedInput(questionData);

console.log(`Part 2: ${getNumberOfPaths(parsedInput)}\n`);

console.timeEnd("start");
