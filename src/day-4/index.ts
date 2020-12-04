// import data from "./sample-data";
import data from "./question-data";

const cleanedRecords = data
  .split("\n\n")
  .map((passport) => passport.replace(/\n/gi, " "))
  .map((passport) => passport.split(" "))
  .map((passport) =>
    Object.fromEntries(
      passport.map((record) => {
        const [, key, value] = record.match(/([a-z]{3}):(.*)/);
        return [key, value];
      })
    )
  );

const answer1 = cleanedRecords
  .map((record) => {
    const requiredRecords =
      record["byr"] &&
      record["iyr"] &&
      record["eyr"] &&
      record["hgt"] &&
      record["hcl"] &&
      record["ecl"] &&
      record["pid"];

    return requiredRecords;
  })
  .filter((x) => x).length;

console.log(`\n\nAnswer part 1: ${answer1}`);

console.log(cleanedRecords.length);

const answer2 = cleanedRecords
  .map((record) => {
    const requiredRecords =
      record["byr"] &&
      record["iyr"] &&
      record["eyr"] &&
      record["hgt"] &&
      record["hcl"] &&
      record["ecl"] &&
      record["pid"];

    if (!requiredRecords) {
      return false;
    }

    const passportId = record.pid;
    if (!passportId.match(/^([0-9]{9})$/)) {
      return false;
    }

    const validEyeColours = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];
    const eyeColour = record.ecl;

    if (!validEyeColours.includes(eyeColour)) {
      return false;
    }

    const hairColour = record.hcl;
    if (!hairColour.match(/#([0-f]{6})/)) {
      return false;
    }

    const height = record.hgt;
    const heightNumber = Number(height.substr(0, height.length - 2));

    if (height.includes("cm") === height.includes("in")) return false;

    if (height.includes("cm") && (heightNumber < 150 || heightNumber > 193)) {
      return false;
    }

    if (height.includes("in") && (heightNumber < 59 || heightNumber > 76)) {
      return false;
    }

    const birthYear = Number(record.byr);
    if (birthYear < 1920) return false;
    if (birthYear > 2002) return false;

    const issueYear = Number(record.iyr);
    if (issueYear < 2010) return false;
    if (issueYear > 2020) return false;

    const expirationYear = Number(record.eyr);
    if (expirationYear < 2020) return false;
    if (expirationYear > 2030) return false;

    return true;
  })
  .filter((x) => x).length;

console.log(`\n\nAnswer part 2: ${answer2}`);
