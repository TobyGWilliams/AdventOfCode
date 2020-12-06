import questionCodes from "./question-data";

const mappedCodes = questionCodes.split("\n");

// BFFFBBFRRR: row 70, column 7, seat ID 567.
// FFFBBBFRRR: row 14, column 7, seat ID 119.
// BBFFBBFRLL: row 102, column 4, seat ID 820.
// const codes = ["BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"];

const seatNumbers = mappedCodes
  .map((code) => Array.from(code))
  .map((code) => ({ row: code.slice(0, 7), column: code.slice(7, 10) }))
  .map(({ row, column }) => ({
    row: row.map((x) => (x === "B") * 1).join(""),
    column: column.map((x) => (x === "R") * 1).join(""),
  }))
  .map(({ row, column }) => ({
    row: parseInt(row, 2),
    column: parseInt(column, 2),
  }))
  .map(({ row, column }) => row * 8 + column);

console.log("part 1: ", Math.max(...seatNumbers));

const seats: number[] = [];

for (let i = 0; i < 128; i++) {
  for (let j = 0; j < 8; j++) {
    const seatId = i * 8 + j;
    if (!seatNumbers.includes(seatId)) {
      seats.push(seatId);
    }
  }
}

const answer2 = seats.filter(
  (item, index) =>
    !(item - 1 === seats[index - 1] || item + 1 === seats[index + 1])
);

console.log("part 2: ", answer2[0]);
