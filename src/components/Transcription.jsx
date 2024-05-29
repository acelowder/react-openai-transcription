import { useState } from "react";
import "./Transcription.css";

export function Transcription({ loading }) {
  const [tab, setTab] = useState(0);

  return (
    <section className={loading ? "fade-in" : "hidden"}>
      <div className="title">
        <h1>
          Your{" "}
          <span className={tab === 0 ? "success" : "action"}>
            {tab === 0 ? "Transcription" : "Translation"}
          </span>
        </h1>
        <h3>Transcribing...</h3>
      </div>
      <div className="loading">
        {[0, 1, 2].map((i) => (
          <div className={`loading-bar loading-${i}`} key={i} />
        ))}
      </div>
      <div className="tab-menu">
        <button
          className={`tab ${tab === 0 ? `active-0` : ""}`}
          onClick={() => setTab(0)}
        >
          <h3>Transcription</h3>
        </button>
        <button
          className={`tab ${tab === 1 ? "active-1" : ""}`}
          onClick={() => setTab(1)}
        >
          <h3>Translation</h3>
        </button>
      </div>
      {tab === 0 ? <div>Transcription</div> : <div>Translation</div>}
    </section>
  );
}
