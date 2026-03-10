import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ListeningTestQuestionCard, {
  countQuestionCorrect,
  countQuestionSlots
} from "./ListeningTestQuestionCard";

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

export default function ListeningTestFormPage({ test }) {
  const { questions, instruction, title } = test;
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const totalQuestions = questions.length;
  const totalAnswerSlots = useMemo(() => {
    return questions.reduce((total, question) => total + countQuestionSlots(question), 0);
  }, [questions]);
  const answeredSlots = countAnsweredSlots(questions, answers);
  const score = questions.reduce((total, question) => {
    return total + countQuestionCorrect(question, answers);
  }, 0);
  const currentQuestion = questions[currentQuestionIndex];

  function handleAnswerChange(answerKey, value) {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [answerKey]: value
    }));
  }

  function handleQuestionChange(nextIndex) {
    setCurrentQuestionIndex(nextIndex);
  }

  function handleSubmit() {
    setSubmitted(true);
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
          <h1>{title}</h1>
          <p>
            Trang nay su dung dieu huong tung cau theo form goc. Moi lan chi hien thi
            mot block cau hoi, co the chuyen cau bang Previous, Next hoac chon so cau.
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

        <div className="pagination__pages">
          {questions.map((question, index) => (
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
