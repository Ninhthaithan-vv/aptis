import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ListeningTestQuestionCard, {
  countQuestionCorrect,
  countQuestionSlots
} from "./ListeningTestQuestionCard";
import { shuffleArray } from "../utils/shuffle";

function getAnswerKey(questionId, itemId = "main") {
  return `${questionId}:${itemId}`;
}

function countAnsweredSlots(questions, answers) {
  return questions.reduce((total, question) => {
    if (question.type === "single_choice") {
      return total + (answers[getAnswerKey(question.id)] ? 1 : 0);
    }

    return (
      total +
      question.items.reduce((itemTotal, item) => {
        return itemTotal + (answers[getAnswerKey(question.id, item.id)] ? 1 : 0);
      }, 0)
    );
  }, 0);
}

export default function ListeningTestFormPage({
  test,
  backTo = "/listening",
  backLabel = "Listening",
  enableQuestionShuffle = false
}) {
  const { questions, instruction, title } = test;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedQuestions, setDisplayedQuestions] = useState(questions);
  const [isShuffled, setIsShuffled] = useState(false);
  const [jumpValue, setJumpValue] = useState("1");
  const [jumpError, setJumpError] = useState("");

  const totalQuestions = displayedQuestions.length;
  const totalAnswerSlots = useMemo(() => {
    return questions.reduce((total, question) => total + countQuestionSlots(question), 0);
  }, [questions]);
  const answeredSlots = countAnsweredSlots(questions, answers);
  const score = questions.reduce((total, question) => {
    return total + countQuestionCorrect(question, answers);
  }, 0);
  const currentQuestion = displayedQuestions[currentQuestionIndex];

  useEffect(() => {
    setDisplayedQuestions(questions);
    setIsShuffled(false);
    setCurrentQuestionIndex(0);
  }, [questions]);

  useEffect(() => {
    setJumpValue(String(currentQuestionIndex + 1));
    setJumpError("");
  }, [currentQuestionIndex]);

  function handleAnswerChange(answerKey, value) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [answerKey]: value
    }));
  }

  function handleQuestionChange(nextIndex) {
    setCurrentQuestionIndex(nextIndex);
  }

  function handleShuffleQuestions() {
    const currentQuestionId = displayedQuestions[currentQuestionIndex]?.id;
    const nextQuestions = shuffleArray(questions);
    const nextIndex = nextQuestions.findIndex((question) => question.id === currentQuestionId);

    setDisplayedQuestions(nextQuestions);
    setIsShuffled(true);
    setCurrentQuestionIndex(nextIndex >= 0 ? nextIndex : 0);
  }

  function handleResetQuestionOrder() {
    const currentQuestionId = displayedQuestions[currentQuestionIndex]?.id;
    const nextIndex = questions.findIndex((question) => question.id === currentQuestionId);

    setDisplayedQuestions(questions);
    setIsShuffled(false);
    setCurrentQuestionIndex(nextIndex >= 0 ? nextIndex : 0);
  }

  function handleJumpSubmit(event) {
    event.preventDefault();

    const parsedQuestion = Number.parseInt(jumpValue, 10);

    if (!Number.isInteger(parsedQuestion) || parsedQuestion < 1 || parsedQuestion > totalQuestions) {
      setJumpError(`Enter a number from 1 to ${totalQuestions}.`);
      return;
    }

    setJumpError("");
    handleQuestionChange(parsedQuestion - 1);
  }

  function handleSubmit() {
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="page-shell">
      <section className="exam-header">
        <div>
          <Link className="back-link" to={backTo}>
            {backLabel}
          </Link>
          <span className="eyebrow">Listening Skill</span>
          <h1>{title}</h1>
          <p>
            Trang nay su dung dieu huong tung cau theo form goc. Moi lan chi hien thi
            mot block cau hoi, co the chuyen cau bang Previous va Next.
          </p>
          {enableQuestionShuffle ? (
            <div className="exam-tools">
              <button
                type="button"
                className="button button--secondary"
                onClick={handleShuffleQuestions}
              >
                Shuffle
              </button>
              <button
                type="button"
                className="button button--ghost"
                onClick={handleResetQuestionOrder}
                disabled={!isShuffled}
              >
                Reset
              </button>
              <span className="exam-tools__status">
                {isShuffled ? "Dang hien thi ngau nhien" : "Dang hien thi theo thu tu goc"}
              </span>
            </div>
          ) : null}
        </div>

        <div className="exam-summary">
          <div>
            <span>Status</span>
            <strong>{submitted ? "Submitted" : "In progress"}</strong>
          </div>
          <div>
            <span>Answered</span>
            <strong>
              {answeredSlots}/{totalAnswerSlots}
            </strong>
          </div>
          <div>
            <span>Question</span>
            <strong>
              {currentQuestionIndex + 1}/{totalQuestions}
            </strong>
          </div>
          <div>
            <span>Score</span>
            <strong>{submitted ? `${score}/${totalAnswerSlots}` : "--"}</strong>
          </div>
        </div>
      </section>

      <details className="instruction-panel">
        <summary>Huong dan va ghi chu cua de</summary>
        <div className="instruction-panel__content">
          <ul>
            {instruction.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p>{instruction.closing[0]}</p>
          <p>{instruction.closing[1]}</p>
        </div>
      </details>

      {submitted ? (
        <section className="result-banner">
          <h2>
            Result: {score}/{totalAnswerSlots} correct
          </h2>
          <p>
            Dap an dung dang duoc hien thi ngay trong tung cau hoi khi anh chuyen qua
            cac cau.
          </p>
        </section>
      ) : null}

      <section className="questions-list">
        <ListeningTestQuestionCard
          question={currentQuestion}
          index={currentQuestionIndex}
          answers={answers}
          onAnswerChange={handleAnswerChange}
          submitted={submitted}
        />
      </section>

      <div className="pagination">
        <button
          type="button"
          className="button button--secondary"
          onClick={() => handleQuestionChange(currentQuestionIndex - 1)}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        <div className="pagination__center">
          <div className="pagination__current">
            {currentQuestionIndex + 1}/{totalQuestions}
          </div>

          <form className="pagination__jump" onSubmit={handleJumpSubmit}>
            <label className="pagination__jump-label" htmlFor="jump-to-question">
              Go to question
            </label>
            <div className="pagination__jump-controls">
              <input
                id="jump-to-question"
                className="pagination__jump-input"
                type="number"
                min="1"
                max={totalQuestions}
                inputMode="numeric"
                value={jumpValue}
                onChange={(event) => {
                  setJumpValue(event.target.value);
                  if (jumpError) {
                    setJumpError("");
                  }
                }}
              />
              <button type="submit" className="button button--secondary">
                Go
              </button>
            </div>
            {jumpError ? <p className="pagination__jump-error">{jumpError}</p> : null}
          </form>
        </div>

        <button
          type="button"
          className="button button--secondary"
          onClick={() => handleQuestionChange(currentQuestionIndex + 1)}
          disabled={currentQuestionIndex === totalQuestions - 1}
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
