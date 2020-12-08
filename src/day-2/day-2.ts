import codes from "./day-2-codes";

// const codes = "1-3 a: abcde\n1-3 b: cdefg\n2-9 c: ccccccccc";

const parsedCodes = codes.split("\n").map((code) => {
  // @ts-ignore
  const [, low, high, letter, password] = code.match(
    /([0-9]*)-([0-9]*) ([a-z]): (.*)/
  );

  if (!low || !high || !letter || !password) {
    throw new Error("value missing");
  }

  return { low, high, letter, password };
});

const answer1 = parsedCodes.reduce(
  (previousValue, { low, high, letter, password }) => {
    const count = password
      .split("")
      .reduce(
        (previousValue, passwordLetter) =>
          passwordLetter === letter ? (previousValue += 1) : previousValue,
        0
      );

    if (count <= Number(high) && count >= Number(low)) {
      return (previousValue += 1);
    }

    return previousValue;
  },
  0
);

console.log(`Part 1 Answer: ${answer1}\n\n`);

const answer2 = parsedCodes.reduce(
  (previousValue, { low, high, letter, password }) => {
    const passwordAsArray = password.split("");

    const valid =
      (passwordAsArray[Number(low) - 1] == letter) !=
      (passwordAsArray[Number(high) - 1] == letter);

    return valid ? (previousValue += 1) : previousValue;
  },
  0
);

console.log(`Part 1 Answer: ${answer2}\n\n`);
