import got from "got";

const token = ''

export default async () => {
  try {
    const { body } = await got.get(
      "https://adventofcode.com/2020/day/1/input",
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          cookie: `session=${token}`,
        },
        method: "GET",
      }
    );

    return body
      .trim()
      .split("\n")
      .map((value) => Number(value));
  } catch (err) {
    throw new Error("Unable to get codes! try token");
  }
};
