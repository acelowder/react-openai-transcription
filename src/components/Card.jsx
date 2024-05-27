import "./Card.css";

export function Card({ children, pills, buttonIcon }) {
  return (
    <div className="card">
      <div className="card-content">
        <h2>{children}</h2>
        <div className="pill-container">
          {pills.map((pill) => (
            <span className={`pill ${pill.highlight ? "highlight" : ""}`}>
              {pill.text}
            </span>
          ))}
        </div>
      </div>
      <button className="icon-button">{buttonIcon}</button>
    </div>
  );
}
