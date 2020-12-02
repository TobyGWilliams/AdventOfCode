import codes from "./day-1-codes";

(async () => {
  const answer = codes.find((value) => codes.includes(2020 - value));

  if (!answer) {
    const err = new Error("answer not found!");
    // @ts-ignore
    err.answer = answer;
    throw err;
  }

  if (answer !== 1825) {
    throw new Error("wrong answer");
  }

  console.log(
    `\nPart 1 Answer\n\tsum: ${answer} + ${2020 - answer} = 2020\n\tproduct: ${
      answer * (2020 - answer)
    }\n\n`
  );
})();

(async () => {
  const doStuff = (codes: number[]): { product: number; inputs: number[] } => {
    const length = codes.length;

    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        for (let k = 0; k < length; k++) {
          if (i !== j && i !== k && j !== k && i < j && j < k) {
            if (codes[i] + codes[j] + codes[k] === 2020) {
              return {
                product: codes[i] * codes[j] * codes[k],
                inputs: [codes[i], codes[j], codes[k]],
              };
            }
          }
        }
      }
    }

    throw new Error("value not found");
  };

  const { product, inputs } = doStuff(codes);

  if (inputs[0] !== 346 || inputs[1] !== 1380 || inputs[2] !== 294) {
    throw new Error(`Wrong triplet answer \n${JSON.stringify(inputs)}`);
  }

  console.log(
    `\nPart 2 Answer\n\tsum: ${inputs[0]} + ${inputs[1]} + ${inputs[2]} = 2020\n\tproduct: ${product}\n\n`
  );
})();
