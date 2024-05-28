import { FaMicrophone } from "react-icons/fa";
import "./Recording.css";

export function Recording({ onRecord, onUpload, file, recording }) {
  const arrow = <b style={{ fontWeight: 1000 }}>&rarr;</b>;
  console.log(file, recording);

  return (
    <section className={file || recording ? "hidden" : "fade-in"}>
      <div className="title">
        <h1>
          Sound<span>Scribe</span>
        </h1>
        <h2>
          Record {arrow} Transcribe {arrow} Translate
        </h2>
      </div>
      <button className="record-button" onClick={onRecord}>
        <h3>Record</h3>
        <FaMicrophone />
      </button>
      <h3>
        Or{" "}
        <label>
          upload
          {!file && (
            <input
              hidden={true}
              type="file"
              accept=".mp3, .wav"
              onChange={onUpload}
            />
          )}
        </label>{" "}
        an audio file
      </h3>
    </section>
  );
}
