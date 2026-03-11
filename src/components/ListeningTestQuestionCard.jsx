function getAnswerKey(questionId, itemId = "main") {
  return `${questionId}:${itemId}`;
}

function getOptionEntries(question) {
  return Object.keys(question.options || {});
}

function getQuestionTotal(question) {
  if (question.type === "single_choice") {
    return 1;
  }

  return question.items.length;
}

function getQuestionScore(question, answers) {
  if (question.type === "single_choice") {
    if (!question.correctAnswer) {
      return 0;
    }
    return answers[getAnswerKey(question.id)] === question.correctAnswer ? 1 : 0;
  }

  return question.items.reduce((total, item) => {
    const answerKey = getAnswerKey(question.id, item.id);
    if (!item.correctAnswer) {
      return total;
    }
    return total + (answers[answerKey] === item.correctAnswer ? 1 : 0);
  }, 0);
}

function renderNote(note) {
  if (!note) {
    return null;
  }

  return (
    <div className="question-note">
      {note.answer ? (
        <p>
          <strong>Đáp án đúng:</strong> {note.answer}
        </p>
      ) : null}
      {note.explanation ? (
        <p>
          <strong>Giải thích:</strong> {note.explanation}
        </p>
      ) : null}
      {note.quote ? (
        <p>
          <strong>Trích dẫn:</strong> "{note.quote}"
        </p>
      ) : null}
    </div>
  );
}

function SingleChoiceQuestion({ question, answers, onAnswerChange, submitted }) {
  const answerKey = getAnswerKey(question.id);
  const selectedAnswer = answers[answerKey];
  const hasCorrectAnswer = Boolean(question.correctAnswer);
  const isCorrect = submitted && hasCorrectAnswer && selectedAnswer === question.correctAnswer;
  const optionEntries = getOptionEntries(question);

  return (
    <>
      <h3>{question.prompt}</h3>
      <div className="question-card__options">
        {optionEntries.map((optionKey) => {
          const isSelected = selectedAnswer === optionKey;
          const shouldMarkCorrect = submitted && question.correctAnswer === optionKey;
          const shouldMarkWrong =
            submitted && isSelected && question.correctAnswer !== optionKey;

          return (
            <label
              key={optionKey}
              className={`question-option ${
                isSelected ? "is-selected" : ""
              } ${shouldMarkCorrect ? "is-correct" : ""} ${
                shouldMarkWrong ? "is-wrong" : ""
              }`}
            >
              <input
                type="radio"
                name={`question-${question.id}`}
                value={optionKey}
                checked={isSelected || false}
                onChange={() => onAnswerChange(answerKey, optionKey)}
                disabled={submitted}
              />
              <span className="question-option__key">{optionKey}</span>
              <span>{question.options[optionKey]}</span>
            </label>
          );
        })}
      </div>

      {submitted && hasCorrectAnswer ? (
        <>
          <div className={`question-card__result ${isCorrect ? "is-correct" : "is-wrong"}`}>
            <strong>Correct answer: {question.correctAnswer}</strong>
            <span>{question.options[question.correctAnswer]}</span>
          </div>
          {renderNote(question.note)}
        </>
      ) : null}
    </>
  );
}

function MatchingQuestion({ question, answers, onAnswerChange, submitted }) {
  const questionScore = getQuestionScore(question, answers);
  const questionTotal = getQuestionTotal(question);

  return (
    <>
      <h3>{question.prompt}</h3>
      {question.noteIntro?.length ? (
        <div className="question-note question-note--soft">
          {question.noteIntro.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      ) : null}

      <div className="matching-list">
        {question.items.map((item) => {
          const answerKey = getAnswerKey(question.id, item.id);
          const selectedAnswer = answers[answerKey] || "";
          const hasCorrectAnswer = Boolean(item.correctAnswer);
          const isCorrect = submitted && hasCorrectAnswer && selectedAnswer === item.correctAnswer;
          const isWrong =
            submitted &&
            hasCorrectAnswer &&
            selectedAnswer &&
            selectedAnswer !== item.correctAnswer;

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

              {submitted && hasCorrectAnswer ? (
                <>
                  <div
                    className={`question-card__result ${
                      isCorrect ? "is-correct" : "is-wrong"
                    }`}
                  >
                    <strong>Correct answer:</strong>
                    <span>{item.correctAnswer}</span>
                  </div>
                  {renderNote(item)}
                </>
              ) : null}
            </div>
          );
        })}
      </div>

      {submitted ? (
        <div
          className={`question-card__result ${
            questionScore === questionTotal ? "is-correct" : "is-wrong"
          }`}
        >
          <strong>
            Question score: {questionScore}/{questionTotal}
          </strong>
        </div>
      ) : null}
    </>
  );
}

function GroupedQuestion({ question, answers, onAnswerChange, submitted }) {
  const questionScore = getQuestionScore(question, answers);
  const questionTotal = getQuestionTotal(question);

  return (
    <>
      <h3>{question.prompt}</h3>
      <div className="grouped-question-list">
        {question.items.map((item, itemIndex) => {
          const answerKey = getAnswerKey(question.id, item.id);
          const selectedAnswer = answers[answerKey];
          const hasCorrectAnswer = Boolean(item.correctAnswer);
          const isCorrect = submitted && hasCorrectAnswer && selectedAnswer === item.correctAnswer;
          const optionEntries = getOptionEntries(item);

          return (
            <section key={item.id} className="grouped-question-item">
              <h4>
                {itemIndex + 1}. {item.prompt}
              </h4>
              <div className="question-card__options">
                {optionEntries.map((optionKey) => {
                  const isSelected = selectedAnswer === optionKey;
                  const shouldMarkCorrect =
                    submitted && hasCorrectAnswer && item.correctAnswer === optionKey;
                  const shouldMarkWrong =
                    submitted && hasCorrectAnswer && isSelected && item.correctAnswer !== optionKey;

                  return (
                    <label
                      key={optionKey}
                      className={`question-option ${
                        isSelected ? "is-selected" : ""
                      } ${shouldMarkCorrect ? "is-correct" : ""} ${
                        shouldMarkWrong ? "is-wrong" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${question.id}-${item.id}`}
                        value={optionKey}
                        checked={isSelected || false}
                        onChange={() => onAnswerChange(answerKey, optionKey)}
                        disabled={submitted}
                      />
                      <span className="question-option__key">{optionKey}</span>
                      <span>{item.options[optionKey]}</span>
                    </label>
                  );
                })}
              </div>

              {submitted && hasCorrectAnswer ? (
                <>
                  <div
                    className={`question-card__result ${
                      isCorrect ? "is-correct" : "is-wrong"
                    }`}
                  >
                    <strong>Correct answer: {item.correctAnswer}</strong>
                    <span>{item.options[item.correctAnswer]}</span>
                  </div>
                  {renderNote(item)}
                </>
              ) : null}
            </section>
          );
        })}
      </div>

      {submitted ? (
        <div
          className={`question-card__result ${
            questionScore === questionTotal ? "is-correct" : "is-wrong"
          }`}
        >
          <strong>
            Question score: {questionScore}/{questionTotal}
          </strong>
        </div>
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

export default function ListeningTestQuestionCard({
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

      {question.type === "single_choice" ? (
        <SingleChoiceQuestion
          question={question}
          answers={answers}
          onAnswerChange={onAnswerChange}
          submitted={submitted}
        />
      ) : null}

      {question.type === "matching" ? (
        <MatchingQuestion
          question={question}
          answers={answers}
          onAnswerChange={onAnswerChange}
          submitted={submitted}
        />
      ) : null}

      {question.type === "grouped_choice" ? (
        <GroupedQuestion
          question={question}
          answers={answers}
          onAnswerChange={onAnswerChange}
          submitted={submitted}
        />
      ) : null}
    </article>
  );
}
