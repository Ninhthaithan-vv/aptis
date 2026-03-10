import { Link } from "react-router-dom";
import { readingTests } from "../data/readingTests";

export default function ReadingPage() {
  const readyCount = readingTests.filter((test) => test.status === "ready").length;

  return (
    <main className="page-shell">
      <section className="listening-hero">
        <div className="listening-hero__copy">
          <Link className="back-link" to="/">
            Home
          </Link>
          <span className="eyebrow">Reading Skill</span>
          <h1>Reading Tests</h1>
          <p>
            Chon mot test de vao bo de doc. Hien tai Test 1 den Test 13 da co noi
            dung, cac test con lai van o trang placeholder cho den khi co de bai chi
            tiet.
          </p>
        </div>

        <div className="listening-hero__panel">
          <div>
            <span>Total tests</span>
            <strong>{readingTests.length}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong>{readyCount} ready / {readingTests.length - readyCount} placeholder</strong>
          </div>
          <div>
            <span>Range</span>
            <strong>Test 1 - Test 15</strong>
          </div>
        </div>
      </section>

      <section className="tests-grid">
        {readingTests.map((test) => (
          <Link key={test.id} className="test-card" to={test.to}>
            <span className="test-card__badge">Reading</span>
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
