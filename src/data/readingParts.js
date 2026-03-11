import { readingPart1 } from "./readingPart1";
import { readingPart3 } from "./readingPart3";
import { readingTest1 } from "./readingTests1";

const partDefinitions = [
  {
    id: "part-1",
    title: "Part 1",
    description: "Full 13-question set",
    summary: "Gap-fill practice",
    startIndex: 0,
    endIndex: 1
  },
  {
    id: "part-2",
    title: "Part 2",
    description: "Questions 2-3",
    summary: "Sentence order practice",
    startIndex: 1,
    endIndex: 3
  },
  {
    id: "part-3",
    title: "Part 3",
    description: "Full 25-question set",
    summary: "Sentence order practice",
    startIndex: 3,
    endIndex: 4
  },
  {
    id: "part-4",
    title: "Part 4",
    description: "Question 5",
    summary: "Heading match practice",
    startIndex: 4,
    endIndex: 5
  }
];

export const readingPartCards = partDefinitions.map((part) => ({
  id: part.id,
  title: part.title,
  description: `${part.description}. ${part.summary}.`,
  to: `/reading-parts/${part.id}`
}));

export const readingPartTests = Object.fromEntries(
  partDefinitions.map((part) => [
    part.id,
    part.id === "part-1"
      ? readingPart1
      : part.id === "part-3"
        ? readingPart3
        : {
          id: part.id,
          title: `Reading by Part - ${part.title}`,
          instruction: readingTest1.instruction,
          questions: readingTest1.questions.slice(part.startIndex, part.endIndex)
        }
  ])
);
