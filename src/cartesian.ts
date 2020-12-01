export default (...inputArrays: number[][]): number[][] =>
  inputArrays.reduce((acc, arr) =>
    acc.flatMap((currentValue: number[]) =>
      arr.map((value: number) =>
        currentValue.length ? [...currentValue, value] : [currentValue, value]
      )
    )
  );
