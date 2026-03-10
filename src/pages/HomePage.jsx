import SkillCard from "../components/SkillCard";
import { listeningQuestions } from "../data/listeningQuestions_1_13";

const skills = [
  {
    title: "Listening",
    description: "Open the listening hub and choose one of 17 tests before adding question content.",
    to: "/listening",
    accent: "#ff7a18",
    available: true
  },
  {
    title: "Reading",
    description: "Open the reading hub and choose one of 15 placeholder tests.",
    to: "/reading",
    accent: "#2d6cdf",
    available: true
  },
  {
    title: "Writing",
    description: "Future workspace for prompts, short essays, and structured corrections.",
    to: "/writing",
    accent: "#0f9d7a",
    available: false
  },
  {
    title: "Speaking",
    description: "Placeholder for speaking practice topics, cue cards, and evaluation flow.",
    to: "/speaking",
    accent: "#ff4f6d",
    available: false
  },
  {
    title: "Grammar & Vocabulary",
    description: "Dedicated area for grammar drills, vocabulary sets, and quick checks.",
    to: "/grammar-vocabulary",
    accent: "#d39d00",
    available: false
  }
];

export default function HomePage() {
  const totalListeningQuestions = listeningQuestions.length;

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero__copy">
          <span className="eyebrow">English Skills Exam</span>
          <h1>Build one place to practice every skill, starting with structured listening sets.</h1>
          <p>
            Choose a skill to enter. The Listening section now opens a hub with 17 test
            cards, and the older Listening 1-13 practice set is still available in the
            project while you continue adding new content.
          </p>
        </div>

        <div className="hero__panel">
          <div>
            <strong>Listening Hub</strong>
            <p>17 test cards are ready for you to attach content.</p>
          </div>
          <div>
            <strong>Listening 1-13</strong>
            <p>{totalListeningQuestions} questions remain available in the current dataset.</p>
          </div>
        </div>
      </section>

      <section className="skills-grid">
        {skills.map((skill) => (
          <SkillCard key={skill.title} {...skill} />
        ))}
      </section>
    </main>
  );
}
