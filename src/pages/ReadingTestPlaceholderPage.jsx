import { Link, useParams } from "react-router-dom";

function formatTestTitle(testId) {
  if (!testId) {
    return "Reading Test";
  }

  return testId
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ReadingTestPlaceholderPage() {
  const { testId } = useParams();
  const title = formatTestTitle(testId);

  return (
    <main className="page-shell page-shell--compact">
      <section className="placeholder">
        <span className="eyebrow">Reading Test</span>
        <h1>{title}</h1>
        <p>
          Route cua test nay da duoc tao, nhung noi dung reading van chua duoc them
          vao. Khi anh gui de bai, toi co the gan vao dung test nay.
        </p>
        <Link className="button button--secondary" to="/reading">
          Back to Reading
        </Link>
      </section>
    </main>
  );
}
