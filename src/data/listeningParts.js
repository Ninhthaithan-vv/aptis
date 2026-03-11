import { listeningPart1 } from "./listeningPart1";
import { listeningPart2 } from "./listeningPart2";
import { listeningPart3 } from "./listeningPart3";
import { listeningPart4 } from "./listeningPart4";
import { listeningTest1 } from "./listeningTests1";

const partDefinitions = [
  {
    id: "part-1",
    title: "Part 1",
    description: "Full 185-question set",
    summary: "Imported from raw listening form",
    startIndex: 0,
    endIndex: 13
  },
  {
    id: "part-2",
    title: "Part 2",
    description: "Full 13-question set",
    summary: "Imported from raw part 2 form",
    startIndex: 13,
    endIndex: 14
  },
  {
    id: "part-3",
    title: "Part 3",
    description: "Full 13-question set",
    summary: "Imported from raw part 3 form",
    startIndex: 14,
    endIndex: 15
  },
  {
    id: "part-4",
    title: "Part 4",
    description: "Full 16-question set",
    summary: "Imported from raw part 4 form",
    startIndex: 15,
    endIndex: 17
  }
];

export const listeningPartCards = partDefinitions.map((part) => ({
  id: part.id,
  title: part.title,
  description: `${part.description}. ${part.summary}.`,
  to: `/listening-parts/${part.id}`
}));

export const listeningPartTests = Object.fromEntries(
  partDefinitions.map((part) => [
    part.id,
    part.id === "part-1"
      ? listeningPart1
      : part.id === "part-2"
        ? listeningPart2
        : part.id === "part-3"
          ? listeningPart3
          : part.id === "part-4"
            ? listeningPart4
        : {
          id: part.id,
          title: `Listening by Part - ${part.title}`,
          instruction: listeningTest1.instruction,
          questions: listeningTest1.questions.slice(part.startIndex, part.endIndex)
        }
  ])
);
