import { useState } from "react";
import { Recording } from "./components/Recording";
import { FaPlus } from "react-icons/fa";

import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(null);

  return (
    <>
      <header>
        <h2>
          Sound<span>Scribe</span>
        </h2>
        <button>
          <h3>New</h3>
          <FaPlus />
        </button>
      </header>
      <main>
        <section className={file || recording ? "fade-in" : "hidden"}>
          <div className="title">
            <h1>
              Your <span className="secondary">File</span>
            </h1>
          </div>
          <div className="card">
            <div className="card-content">
              <h3>Name</h3>
              <p>{file ? file.name : "---"}</p>
            </div>
            <div className="card-footer">
              <button
                onClick={() => {
                  setFile(null);
                  setRecording(null);
                }}
              >
                <h3>Reset</h3>
              </button>
              <button className="secondary">
                <h3>Transcribe</h3>
              </button>
            </div>
          </div>
        </section>
        <Recording
          onUpload={(e) => setFile(e.target.files[0])}
          file={file}
          recording={recording}
        />
      </main>
    </>
  );
}
