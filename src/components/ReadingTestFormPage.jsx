import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ReadingTestQuestionCard, {
  countQuestionCorrect,
  countQuestionSlots
} from "./ReadingTestQuestionCard";
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

export default function ReadingTestFormPage({
  test,
  backTo = "/reading",
  backLabel = "Reading",
  enableQuestionShuffle = false
}) {
  const { questions, instruction, title } = test;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [displayedQuestions, setDisplayedQuestions] = useState(questions);
  const [isShuffled, setIsShuffled] = useState(false);

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
          <span className="eyebrow">Reading Skill</span>
          <h1>{title}</h1>
          <p>
            Trang nay su dung dieu huong tung cau theo form goc. Moi lan chi hien thi
            mot block cau hoi, co the chuyen cau bang Previous, Next hoac chon so cau.
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
            Dap an dung va loi giai dang duoc hien thi ngay trong tung cau hoi khi anh
            chuyen qua cac cau.
          </p>
        </section>
      ) : null}

      <section className="questions-list">
        <ReadingTestQuestionCard
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

        <div className="pagination__pages">
          {displayedQuestions.map((question, index) => (
            <button
              key={question.id}
              type="button"
              className={`pagination__page ${
                index === currentQuestionIndex ? "is-active" : ""
              }`}
              onClick={() => handleQuestionChange(index)}
            >
              {index + 1}
            </button>
          ))}
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
