import { Link } from "react-router-dom";

export default function SkillPlaceholderPage({ title }) {
  return (
    <main className="page-shell page-shell--compact">
      <section className="placeholder">
        <span className="eyebrow">Section Preview</span>
        <h1>{title}</h1>
        <p>
          This section is available in the navigation layout, but no question set is
          attached to it yet.
        </p>
        <Link className="button button--secondary" to="/">
          Back to home
        </Link>
      </section>
    </main>
  );
}
