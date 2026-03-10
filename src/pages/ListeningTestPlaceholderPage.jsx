import { Link, useParams } from "react-router-dom";

function formatTestTitle(testId) {
  if (!testId) {
    return "Listening Test";
  }

  return testId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ListeningTestPlaceholderPage() {
  const { testId } = useParams();
  const title = formatTestTitle(testId);

  return (
    <main className="page-shell page-shell--compact">
      <section className="placeholder">
        <span className="eyebrow">Listening Test</span>
        <h1>{title}</h1>
        <p>
          Noi dung cua test nay chua duoc them vao. Khi anh gui de bai, toi co the gan
          du lieu vao dung test nay ngay.
        </p>
        <Link className="button button--secondary" to="/listening">
          Back to Listening
        </Link>
      </section>
    </main>
  );
}
