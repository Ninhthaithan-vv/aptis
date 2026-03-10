import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import QuestionCard from "../components/QuestionCard";
import { listeningQuestions } from "../data/listeningQuestions_1_13";
import { shuffleArray } from "../utils/shuffle";

const QUESTIONS_PER_PAGE = 5;

export default function ListeningTestPage() {
  const randomizedQuestions = useMemo(() => shuffleArray(listeningQuestions), []);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalQuestions = randomizedQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const totalPages = Math.ceil(totalQuestions / QUESTIONS_PER_PAGE);
  const startIndex = (currentPage - 1) * QUESTIONS_PER_PAGE;
  const currentQuestions = randomizedQuestions.slice(
    startIndex,
    startIndex + QUESTIONS_PER_PAGE
  );
  const score = randomizedQuestions.reduce((total, question) => {
    return total + (answers[question.id] === question.correctAnswer ? 1 : 0);
  }, 0);

  function handleAnswerChange(questionId, optionKey) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionKey
    }));
  }

  function handleSubmit() {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handlePageChange(page) {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="page-shell">
      <section className="exam-header">
        <div>
          <Link className="back-link" to="/listening">
            Listening
          </Link>
          <span className="eyebrow">Listening Skill</span>
          <h1>Listening 1-13</h1>
          <p>
            Questions are shuffled automatically when you enter this page. Choose one
            answer for each question in the Listening 1-13 set, then submit to see your
            score and the correct answers under every question.
          </p>
        </div>

        <div className="exam-summary">
          <div>
            <span>Status</span>
            <strong>{submitted ? "Submitted" : "In progress"}</strong>
          </div>
          <div>
            <span>Answered</span>
            <strong>
              {answeredCount}/{totalQuestions}
            </strong>
          </div>
          <div>
            <span>Page</span>
            <strong>
              {currentPage}/{totalPages}
            </strong>
          </div>
          <div>
            <span>Score</span>
            <strong>{submitted ? `${score}/${totalQuestions}` : "--"}</strong>
          </div>
        </div>
      </section>

      {submitted ? (
        <section className="result-banner">
          <h2>
            Result: {score}/{totalQuestions} correct
          </h2>
          <p>Each question below now shows the correct answer at its position.</p>
        </section>
      ) : null}

      <section className="questions-list">
        {currentQuestions.map((question, index) => (
          <QuestionCard
            key={question.id}
            question={question}
            index={startIndex + index}
            selectedAnswer={answers[question.id]}
            onAnswerChange={handleAnswerChange}
            submitted={submitted}
          />
        ))}
      </section>

      <div className="pagination">
        <button
          type="button"
          className="button button--secondary"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>

        <div className="pagination__pages">
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                type="button"
                className={`pagination__page ${
                  page === currentPage ? "is-active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="button button--secondary"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      <div className="exam-actions">
        <button
          type="button"
          className="button"
          onClick={handleSubmit}
          disabled={submitted}
        >
          Submit
        </button>
      </div>
    </main>
  );
}
