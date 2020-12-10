import questionData from "./question-data";

console.time("start");

const sampleInput1 = `16
10
15
5
1
11
7
19
6
12
4`;

const sampleInput2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

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

const [countOfOnes, countOfTwos, countOfThrees] = getCountOfNumbers(
  questionData
);

console.log(`\nPart 1: ${countOfOnes * countOfThrees}\n`);

// console.log(getCountOfNumbers(sampleInput1));

const parsedInput1 = getSortedInput(sampleInput1);
const parsedInput2 = getSortedInput(sampleInput2);
const parsedInput3 = getSortedInput(questionData);

// console.log(parsedInput1);

// const getNextStep = (index: number, data: number[]) => {
//   if (index === data.length - 1) {
//     return 1;
//   }

//   const nextIndexes = [index + 1, index + 2, index + 3];
//   const current = data[index];

//   return nextIndexes
//     .filter((index) => data[index] - current <= 3)
//     .flatMap((x) => getNextStep(x, data));
// };

// console.log(getNextStep(0, parsedInput1).length);
// console.log(getNextStep(0, parsedInput2).length);
// console.log(getNextStep(0, parsedInput3).length);

console.log(
  parsedInput1.map((current, index, array) => {
    const nextIndexes = [index + 1, index + 2, index + 3];

    return nextIndexes.filter((index) => array[index] - current <= 3);
  }).map()
);

console.timeEnd("start");
