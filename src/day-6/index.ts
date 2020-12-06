// The first group contains one person who answered "yes" to 3 questions: a, b, and c.
// The second group contains three people; combined, they answered "yes" to 3 questions: a, b, and c.
// The third group contains two people; combined, they answered "yes" to 3 questions: a, b, and c.
// The fourth group contains four people; combined, they answered "yes" to only 1 question, a.
// The last group contains one person who answered "yes" to only 1 question, b.

import data from "./question-data";

const sampleInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

const answer1 = data
  .split("\n\n")
  .map((x) => x.replace(/\n/gi, ""))
  .map(
    (x) =>
      Array.from(x)
        .sort()
        .reduce(
          (previousValue, value, index, array) =>
            value !== array[index + 1]
              ? [...previousValue, value]
              : previousValue,
          []
        ).length
  )
  .reduce((x, y) => x + y);

console.log("Part 1 Answer", answer1);

const answer2 = data
  .split("\n\n")
  .map((group) => group.split("\n"))
  .map(([person, ...restOfGroup]) =>
    !restOfGroup
      ? person.length
      : Array.from(person)
          .map((answer) =>
            restOfGroup
              .map((x) => x.includes(answer))
              .reduce((previous, current) => (current ? previous : false), true)
          )
          .filter(Boolean).length
  )
  .reduce((x, y) => x + y);

console.log("Part 2 Answer", answer2);
