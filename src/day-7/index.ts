import questionData from "./question-data";

const sampleData1 = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;

const sampleData2 = `shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`;

const removeDuplicates = (previousValue, value, index, array) =>
  value !== array[index + 1] ? [...previousValue, value] : previousValue;

const getParentBagColour = (colour: string) => {
  const colours = parsedData
    .filter(
      (x) =>
        x.children.filter((y = ["7", "default bag colour"]) => y[1] === colour)
          .length > 0
    )
    .map((x) => x.parent);
  const parentColours = colours.flatMap((x) => getParentBagColour(x));

  return [...colours, ...parentColours];
};

const getChildrenBags = (colour) => {
  const { children } = parsedData.find((x) => x.parent === colour);

  if (!children.length) return 0;

  return children
    .map(
      ([number, colour]) =>
        Number(number) + Number(number) * getChildrenBags(colour)
    )
    .reduce((x, y) => x + y);
};

const parsedData = questionData.split("\n").map((rule) => {
  const [, parent, children] = rule.match(/(.*) bags contain (.*)./);
  return {
    parent,
    children: children
      .split(", ")
      .map((x) => {
        const match = x.match(/([0-9]) (.*?) bag/);
        if (!match) return undefined;
        return [match[1], match[2]];
      })
      .filter(Boolean),
  };
});

const answer1 = getParentBagColour("shiny gold")
  .sort()
  .reduce(removeDuplicates, []).length;

console.log("Part 1: ", answer1);

console.log("Part2: ", getChildrenBags("shiny gold"));
