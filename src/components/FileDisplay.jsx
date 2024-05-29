import "./FileDisplay.css";

export function FileDisplay({ onReset, file, recording }) {
  return (
    <section className={file || recording ? "fade-in" : "hidden"}>
      <div className="title">
        <h1>
          Your <span className="secondary">File</span>
        </h1>
      </div>
      <div className="card">
        <div className="card-content">
          <h3>Name</h3>
          <p>{file ? file.name : recording ? "Custom Audio" : "---"}</p>
        </div>
        <div className="card-footer">
          <button onClick={onReset}>
            <h3>Reset</h3>
          </button>
          <button className="secondary">
            <h3>Transcribe</h3>
          </button>
        </div>
      </div>
    </section>
  );
}
