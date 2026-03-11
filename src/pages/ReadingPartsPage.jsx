import { Link } from "react-router-dom";
import { readingPartCards } from "../data/readingParts";

export default function ReadingPartsPage() {
  return (
    <main className="page-shell">
      <section className="listening-hero">
        <div className="listening-hero__copy">
          <Link className="back-link" to="/">
            Dashboard
          </Link>
          <span className="eyebrow">Reading By Part</span>
          <h1>Reading by Part</h1>
          <p>
            Practice the reading flow by part. Choose one of the four parts to focus on
            a smaller block before moving back to full tests.
          </p>
        </div>

        <div className="listening-hero__panel">
          <div>
            <span>Total parts</span>
            <strong>{readingPartCards.length}</strong>
          </div>
          <div>
            <span>Coverage</span>
            <strong>Questions 1 - 5</strong>
          </div>
          <div>
            <span>Mode</span>
            <strong>Part-based practice</strong>
          </div>
        </div>
      </section>

      <section className="tests-grid">
        {readingPartCards.map((part) => (
          <Link key={part.id} className="test-card" to={part.to}>
            <span className="test-card__badge">Reading</span>
            <div className="test-card__body">
              <h2>{part.title}</h2>
              <p>{part.description}</p>
            </div>
            <span className="test-card__cta">Open part</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
