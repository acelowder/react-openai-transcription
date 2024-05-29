import "./FileDisplay.css";

export function FileDisplay({
  onReset,
  onTranscribe,
  file,
  recording,
  loading,
}) {
  return (
    <section className={(file || recording) && !loading ? "fade-in" : "hidden"}>
      <div className="title">
        <h1>
          Your <span className="secondary">File</span>
        </h1>
      </div>
      <div className="card">
        <div className="card-content">
          <h3>Name</h3>
          <p>
            {file ? file.name : recording ? "microphone_recording.mp3" : "---"}
          </p>
        </div>
        <hr style={{ opacity: 0.3 }} />
        <div className="card-footer">
          <button onClick={onReset}>
            <h3>Reset</h3>
          </button>
          <button className="secondary" onClick={onTranscribe}>
            <h3>Transcribe</h3>
          </button>
        </div>
      </div>
    </section>
  );
}
