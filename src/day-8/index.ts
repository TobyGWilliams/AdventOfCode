import questionInput from "./question-input";

console.time("start");

const input = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const run = (instructions, lineToChange: number) => {
  let currentLine = 0;
  let accumulator = 0;
  let hitDuplicateLine = false;

  const visitedLines: number[] = [];

  while (!hitDuplicateLine) {
    if (currentLine === instructions.length) {
      break;
    }

    if (visitedLines.includes(currentLine)) {
      hitDuplicateLine = true;
      break;
    }

    visitedLines.push(currentLine);

    const { instruction, numberAsString } = instructions[currentLine];

    if (
      (instruction === "jmp" && currentLine !== lineToChange) ||
      (instruction === "nop" && currentLine === lineToChange)
    ) {
      currentLine += Number(numberAsString);
    }

    if (
      (instruction === "jmp" && currentLine === lineToChange) ||
      (instruction === "nop" && currentLine !== lineToChange)
    ) {
      currentLine += 1;
    }

    if (instruction === "acc") {
      accumulator += Number(numberAsString);
      currentLine += 1;
    }
  }

  return { accumulator, hitDuplicateLine };
};

const getAnswer = (input) => {
  const instructions = input.split("\n").map((currentLine) => {
    const [, instruction, numberAsString] = currentLine.match(
      /^([a-z]{3}) (.*)$/
    );
    return { instruction, numberAsString };
  });

  for (let index = 0; index < instructions.length; index++) {
    const { hitDuplicateLine, accumulator } = run(instructions, index);
    if (!hitDuplicateLine) {
      return accumulator;
    }
  }
};

console.log(getAnswer(questionInput));

console.timeEnd("start");
