import { Link } from "react-router-dom";
import { listeningTests } from "../data/listeningTests";

export default function ListeningPage() {
  return (
    <main className="page-shell">
      <section className="listening-hero">
        <div className="listening-hero__copy">
          <Link className="back-link" to="/">
            Home
          </Link>
          <span className="eyebrow">Listening Skill</span>
          <h1>Listening Tests</h1>
          <p>
            Chon mot test de vao bo de nghe. Hien tai trang nay da co san 17 test
            card tu Test 1 den Test 17, noi dung chi tiet cua tung test se duoc bo
            sung sau.
          </p>
        </div>

        <div className="listening-hero__panel">
          <div>
            <span>Total tests</span>
            <strong>{listeningTests.length}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>Ready for content</strong>
          </div>
          <div>
            <span>Range</span>
            <strong>Test 1 - Test 17</strong>
          </div>
        </div>
      </section>

      <section className="tests-grid">
        {listeningTests.map((test) => (
          <Link key={test.id} className="test-card" to={test.to}>
            <span className="test-card__badge">Listening</span>
            <div className="test-card__body">
              <h2>{test.title}</h2>
              <p>{test.description}</p>
            </div>
            <span className="test-card__cta">Open test</span>
          </Link>
        ))}
      </section>
    </main>
  );
}
