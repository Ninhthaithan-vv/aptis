const optionEntries = ["A", "B", "C"];

export default function QuestionCard({
  question,
  index,
  selectedAnswer,
  onAnswerChange,
  submitted
}) {
  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <article className="question-card">
      <div className="question-card__header">
        <span className="question-card__number">Question {index + 1}</span>
        <span className="question-card__id">#{question.id}</span>
      </div>

      <h3>{question.questionEn}</h3>
      <p className="question-card__subtitle">{question.questionVi}</p>

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
                checked={isSelected}
                onChange={() => onAnswerChange(question.id, optionKey)}
                disabled={submitted}
              />
              <span className="question-option__key">{optionKey}</span>
              <span>{question.options[optionKey]}</span>
            </label>
          );
        })}
      </div>

      {submitted ? (
        <div className={`question-card__result ${isCorrect ? "is-correct" : "is-wrong"}`}>
          <strong>Correct answer: {question.correctAnswer}</strong>
          <span>{question.options[question.correctAnswer]}</span>
        </div>
      ) : null}
    </article>
  );
}
