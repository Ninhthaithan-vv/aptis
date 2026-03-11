import SkillCard from "../components/SkillCard";

const skillGroupOne = [
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

const skillGroupTwo = [
  {
    title: "Listening by Part",
    description: "Open 4 listening cards: Part 1 (1-13), Part 2 (14), Part 3 (15), Part 4 (16-17).",
    to: "/listening-parts",
    accent: "#f25f4c",
    available: true
  },
  {
    title: "Reading by Part",
    description: "Open 4 reading cards: Part 1 (1), Part 2 (2-3), Part 3 (4), Part 4 (5).",
    to: "/reading-parts",
    accent: "#1f8a70",
    available: true
  }
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero__copy">
          <span className="eyebrow">Dashboard</span>
          <h1>Choose a skill group or jump straight into part-based practice.</h1>
          <p>
            Group 1 keeps the original 5 skills. Group 2 gives quick access to
            Listening by Part and Reading by Part so you can practice each section in
            smaller blocks.
          </p>
        </div>

        <div className="hero__panel">
          <div>
            <strong>Skill Group 1</strong>
            <p>5 skill cards: Listening, Reading, Writing, Speaking, Grammar & Vocabulary.</p>
          </div>
          <div>
            <strong>Skill Group 2</strong>
            <p>2 shortcut cards: Listening by Part and Reading by Part.</p>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <span className="eyebrow">Skill Group 1</span>
          <h2>5 skills</h2>
          <p>Keep the original dashboard structure for full skill navigation.</p>
        </div>

        <div className="skills-grid">
          {skillGroupOne.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>

      <section className="dashboard-section">
        <div className="dashboard-section__header">
          <span className="eyebrow">Skill Group 2</span>
          <h2>Practice by part</h2>
          <p>Open part-based hubs to focus on smaller Listening and Reading blocks.</p>
        </div>

        <div className="modes-grid">
          {skillGroupTwo.map((skill) => (
            <SkillCard key={skill.title} {...skill} />
          ))}
        </div>
      </section>
    </main>
  );
}
