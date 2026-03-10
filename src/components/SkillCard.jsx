import { Link } from "react-router-dom";

export default function SkillCard({ title, description, to, accent, available }) {
  return (
    <Link
      className={`skill-card ${available ? "is-available" : "is-locked"}`}
      to={to}
      style={{ "--card-accent": accent }}
    >
      <span className="skill-card__badge">{available ? "Ready" : "Soon"}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <span className="skill-card__cta">
        {available ? "Start exam" : "Preview section"}
      </span>
    </Link>
  );
}
