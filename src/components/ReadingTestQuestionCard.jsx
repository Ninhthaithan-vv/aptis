import { useState } from "react";

function getAnswerKey(questionId, itemId = "main") {
  return `${questionId}:${itemId}`;
}

function getQuestionTotal(question) {
  if (question.type === "single_choice") {
    return 1;
  }

  return question.items.length;
}

function getQuestionScore(question, answers) {
  if (question.type === "single_choice") {
    return answers[getAnswerKey(question.id)] === question.correctAnswer ? 1 : 0;
  }

  return question.items.reduce((total, item) => {
    const answerKey = getAnswerKey(question.id, item.id);
    return total + (answers[answerKey] === item.correctAnswer ? 1 : 0);
  }, 0);
}

function renderAnswerNote(note) {
  if (!note) {
    return null;
  }

  const paragraphs = note.paragraphs ?? [];

  if (!paragraphs.length) {
    return null;
  }

  return (
    <div className="question-note">
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`}>{paragraph}</p>
      ))}
    </div>
  );
}

function renderItemFeedback(item, isCorrect) {
  return (
    <>
      <div className={`question-card__result ${isCorrect ? "is-correct" : "is-wrong"}`}>
        <strong>Correct answer:</strong>
        <span>{item.correctAnswer}</span>
      </div>
      {item.explanation || item.quote ? (
        <div className="question-note">
          {item.explanation ? (
            <p>
              <strong>Explanation:</strong> {item.explanation}
            </p>
          ) : null}
          {item.quote ? (
            <p>
              <strong>Quote:</strong> "{item.quote}"
            </p>
          ) : null}
        </div>
      ) : null}
    </>
  );
}

function InlineSelectQuestion({ question, answers, onAnswerChange, submitted }) {
  const questionScore = getQuestionScore(question, answers);
  const questionTotal = getQuestionTotal(question);

  return (
    <>
      <h3>{question.prompt}</h3>

      <div className="inline-select-list">
        {question.items.map((item) => {
          const answerKey = getAnswerKey(question.id, item.id);
          const selectedAnswer = answers[answerKey] || "";
          const isCorrect = submitted && selectedAnswer === item.correctAnswer;
          const isWrong = submitted && selectedAnswer && selectedAnswer !== item.correctAnswer;

          return (
            <div key={item.id} className="inline-select-item">
              <p className="inline-select-item__sentence">
                <span>{item.prefix} </span>
                <select
                  className={`select-field select-field--inline ${
                    isCorrect ? "is-correct" : ""
                  } ${isWrong ? "is-wrong" : ""}`}
                  value={selectedAnswer}
                  onChange={(event) => onAnswerChange(answerKey, event.target.value)}
                  disabled={submitted}
                >
                  <option value="">----</option>
                  {item.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <span> {item.suffix}</span>
              </p>

              {submitted ? renderItemFeedback(item, isCorrect) : null}
            </div>
          );
        })}
      </div>

      {submitted ? (
        <>
          <div
            className={`question-card__result ${
              questionScore === questionTotal ? "is-correct" : "is-wrong"
            }`}
          >
            <strong>
              Question score: {questionScore}/{questionTotal}
            </strong>
          </div>
          {renderAnswerNote(question.note)}
        </>
      ) : null}
    </>
  );
}

function SentenceOrderQuestion({ question, answers, onAnswerChange, submitted }) {
  const questionScore = getQuestionScore(question, answers);
  const questionTotal = getQuestionTotal(question);
  const [dragOverId, setDragOverId] = useState(null);
  const [isBankDragOver, setIsBankDragOver] = useState(false);

  const assignedOptions = question.items
    .map((item) => answers[getAnswerKey(question.id, item.id)] || "")
    .filter(Boolean);
  const availableOptions = question.options.filter((option) => !assignedOptions.includes(option));

  function handleDragStart(event, optionValue, sourceItemId = "") {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ optionValue, sourceItemId })
    );
  }

  function readDragPayload(event) {
    const rawValue = event.dataTransfer.getData("text/plain");

    if (!rawValue) {
      return null;
    }

    try {
      return JSON.parse(rawValue);
    } catch {
      return null;
    }
  }

  function assignOption(targetItemId, optionValue) {
    question.items.forEach((item) => {
      const answerKey = getAnswerKey(question.id, item.id);

      if (item.id !== targetItemId && answers[answerKey] === optionValue) {
        onAnswerChange(answerKey, "");
      }
    });

    onAnswerChange(getAnswerKey(question.id, targetItemId), optionValue);
  }

  function clearOption(itemId) {
    onAnswerChange(getAnswerKey(question.id, itemId), "");
  }

  function handleDropOnSlot(event, targetItemId) {
    event.preventDefault();
    setDragOverId(null);

    const payload = readDragPayload(event);

    if (!payload?.optionValue) {
      return;
    }

    assignOption(targetItemId, payload.optionValue);
  }

  function handleDropOnBank(event) {
    event.preventDefault();
    setIsBankDragOver(false);

    const payload = readDragPayload(event);

    if (!payload?.sourceItemId) {
      return;
    }

    clearOption(payload.sourceItemId);
  }

  return (
    <>
      <h3>{question.prompt}</h3>
      {question.intro?.length ? (
        <div className="question-note question-note--soft">
          {question.intro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}

      <div className="reading-passage">
        <div className="reading-passage__block">
          <strong>{question.opening}</strong>
        </div>
      </div>

      <div className="sentence-order-layout">
        {!submitted ? (
          <div
            className={`sentence-order-bank ${isBankDragOver ? "is-drag-over" : ""}`}
            onDragOver={(event) => {
              event.preventDefault();
              setIsBankDragOver(true);
            }}
            onDragLeave={() => setIsBankDragOver(false)}
            onDrop={handleDropOnBank}
          >
            <strong>Sentence Bank</strong>
            <p className="sentence-order-bank__hint">
              Keo tung cau vao dung vi tri. Co the keo cau da dat quay lai day de xoa.
            </p>
            <div className="sentence-order-bank__options">
              {availableOptions.map((option) => (
                <button
                  key={option}
                  type="button"
                  className="sentence-order-chip"
                  draggable
                  onDragStart={(event) => handleDragStart(event, option)}
                >
                  {option}
                </button>
              ))}
              {!availableOptions.length ? (
                <span className="sentence-order-bank__empty">
                  Tat ca cac cau da duoc dat vao vi tri.
                </span>
              ) : null}
            </div>
          </div>
        ) : (
          <div className="sentence-order-bank sentence-order-bank--submitted">
            <strong>Sentence Order</strong>
            <p className="sentence-order-bank__hint">
              Dap an da duoc khoa. Xem ket qua tung vi tri o cot ben phai.
            </p>
          </div>
        )}

        <div className="matching-list sentence-order-targets">
          {question.items.map((item) => {
            const answerKey = getAnswerKey(question.id, item.id);
            const selectedAnswer = answers[answerKey] || "";
            const isCorrect = submitted && selectedAnswer === item.correctAnswer;
            const isWrong = submitted && selectedAnswer && selectedAnswer !== item.correctAnswer;

            return (
              <div key={item.id} className="matching-item sentence-order-target">
                <div className="matching-item__prompt">{item.prompt}</div>

                <div
                  className={`sentence-order-slot ${selectedAnswer ? "is-filled" : ""} ${
                    dragOverId === item.id ? "is-drag-over" : ""
                  } ${isCorrect ? "is-correct" : ""} ${isWrong ? "is-wrong" : ""}`}
                  onDragOver={(event) => {
                    if (submitted) {
                      return;
                    }

                    event.preventDefault();
                    setDragOverId(item.id);
                  }}
                  onDragLeave={() => setDragOverId(null)}
                  onDrop={(event) => handleDropOnSlot(event, item.id)}
                >
                  {selectedAnswer ? (
                    <div
                      className="sentence-order-slot__value"
                      draggable={!submitted}
                      onDragStart={(event) =>
                        handleDragStart(event, selectedAnswer, item.id)
                      }
                    >
                      <span>{selectedAnswer}</span>
                      {!submitted ? (
                        <button
                          type="button"
                          className="sentence-order-clear"
                          onClick={() => clearOption(item.id)}
                        >
                          Clear
                        </button>
                      ) : null}
                    </div>
                  ) : (
                    <span className="sentence-order-slot__placeholder">
                      Drop sentence here
                    </span>
                  )}
                </div>

                {submitted ? renderItemFeedback(item, isCorrect) : null}
              </div>
            );
          })}
        </div>
      </div>

      {submitted ? (
        <>
          <div
            className={`question-card__result ${
              questionScore === questionTotal ? "is-correct" : "is-wrong"
            }`}
          >
            <strong>
              Question score: {questionScore}/{questionTotal}
            </strong>
          </div>
          {renderAnswerNote(question.note)}
        </>
      ) : null}
    </>
  );
}

function ReadingMatchQuestion({ question, answers, onAnswerChange, submitted }) {
  const questionScore = getQuestionScore(question, answers);
  const questionTotal = getQuestionTotal(question);

  return (
    <>
      <h3>{question.prompt}</h3>

      {question.articleTitle || question.articleIntro?.length || question.articleSections?.length ? (
        <div className="reading-passage">
          {question.articleTitle ? <h4>{question.articleTitle}</h4> : null}
          {question.articleIntro?.map((paragraph, index) => (
            <p key={`${paragraph}-${index}`}>{paragraph}</p>
          ))}

          {question.articleSections?.map((section) => (
            <div key={section.title} className="reading-passage__block">
              <h4>{section.title}</h4>
              {section.paragraphs.map((paragraph, index) => (
                <p key={`${section.title}-${index}`}>{paragraph}</p>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      <div className="matching-list">
        {question.items.map((item) => {
          const answerKey = getAnswerKey(question.id, item.id);
          const selectedAnswer = answers[answerKey] || "";
          const isCorrect = submitted && selectedAnswer === item.correctAnswer;
          const isWrong = submitted && selectedAnswer && selectedAnswer !== item.correctAnswer;

          return (
            <div key={item.id} className="matching-item">
              <div className="matching-item__prompt">{item.prompt}</div>

              <select
                className={`select-field ${isCorrect ? "is-correct" : ""} ${
                  isWrong ? "is-wrong" : ""
                }`}
                value={selectedAnswer}
                onChange={(event) => onAnswerChange(answerKey, event.target.value)}
                disabled={submitted}
              >
                <option value="">----</option>
                {item.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {item.body ? <p className="reading-match-item__body">{item.body}</p> : null}

              {submitted ? renderItemFeedback(item, isCorrect) : null}
            </div>
          );
        })}
      </div>

      {submitted ? (
        <>
          <div
            className={`question-card__result ${
              questionScore === questionTotal ? "is-correct" : "is-wrong"
            }`}
          >
            <strong>
              Question score: {questionScore}/{questionTotal}
            </strong>
          </div>
          {renderAnswerNote(question.note)}
        </>
      ) : null}
    </>
  );
}

export function countQuestionSlots(question) {
  return getQuestionTotal(question);
}

export function countQuestionCorrect(question, answers) {
  return getQuestionScore(question, answers);
}

export default function ReadingTestQuestionCard({
  question,
  index,
  answers,
  onAnswerChange,
  submitted
}) {
  return (
    <article className="question-card test-question-card">
      <div className="question-card__header">
        <span className="question-card__number">Question {index + 1}</span>
        <span className="question-card__id">{question.sectionTitle}</span>
      </div>

      {question.type === "inline_select" ? (
        <InlineSelectQuestion
          question={question}
          answers={answers}
          onAnswerChange={onAnswerChange}
          submitted={submitted}
        />
      ) : null}

      {question.type === "sentence_order" ? (
        <SentenceOrderQuestion
          question={question}
          answers={answers}
          onAnswerChange={onAnswerChange}
          submitted={submitted}
        />
      ) : null}

      {question.type === "reading_match" ? (
        <ReadingMatchQuestion
          question={question}
          answers={answers}
          onAnswerChange={onAnswerChange}
          submitted={submitted}
        />
      ) : null}
    </article>
  );
}
