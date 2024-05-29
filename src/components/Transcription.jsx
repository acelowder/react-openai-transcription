import "./Transcription.css";

export function Transcription({ loading }) {
  return (
    <section className={loading ? "fade-in" : "hidden"}>
      <div className="title">
        <h1>
          Your <span className="success">Transcription</span>
        </h1>
        <h3>Transcribing...</h3>
      </div>
      {[0, 1, 2].map((i) => (
        <div className={`loading-bar loading-${i}`} key={i} />
      ))}
    </section>
  );
}
