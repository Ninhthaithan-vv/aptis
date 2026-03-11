import { Link } from "react-router-dom";
import { listeningPartCards } from "../data/listeningParts";

export default function ListeningPartsPage() {
  return (
    <main className="page-shell">
      <section className="listening-hero">
        <div className="listening-hero__copy">
          <Link className="back-link" to="/">
            Dashboard
          </Link>
          <span className="eyebrow">Listening By Part</span>
          <h1>Listening by Part</h1>
          <p>
            Practice the listening flow by part. Choose one of the four parts to work on
            a smaller question set instead of the full test.
          </p>
        </div>

        <div className="listening-hero__panel">
          <div>
            <span>Total parts</span>
            <strong>{listeningPartCards.length}</strong>
          </div>
          <div>
            <span>Coverage</span>
            <strong>Questions 1 - 17</strong>
          </div>
          <div>
            <span>Mode</span>
            <strong>Part-based practice</strong>
          </div>
        </div>
      </section>

      <section className="tests-grid">
        {listeningPartCards.map((part) => (
          <Link key={part.id} className="test-card" to={part.to}>
            <span className="test-card__badge">Listening</span>
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
