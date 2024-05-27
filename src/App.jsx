import { FaRotateLeft } from "react-icons/fa6";
import { FaMicrophone } from "react-icons/fa";
import { FaFileUpload } from "react-icons/fa";

import "./App.css";

export default function App() {
  const arrow = <b style={{ fontWeight: 1000 }}>&rarr;</b>;

  return (
    <>
      <header>
        <button className="icon-button">
          <FaRotateLeft />
        </button>
      </header>
      <main>
        <div className="recording">
          <div className="title">
            <h1>SoundScribe</h1>
            <h2>
              Record {arrow} Transcribe {arrow} Translate
            </h2>
          </div>
          <div className="card">
            <div className="card-content">
              <h2>Record your voice</h2>
              <div className="pill-container">
                <span className="pill highlight">Duration</span>
                <span className="pill">MP3</span>
              </div>
            </div>
            <button className="icon-button">
              <FaMicrophone />
            </button>
          </div>
          <div className="card">
            <div className="card-content">
              <h2>Upload a file</h2>
              <div className="pill-container">
                <span className="pill">MP3</span>
                <span className="pill">WAV</span>
              </div>
            </div>
            <button className="icon-button">
              <FaFileUpload />
              <input hidden={true} type="file" accept=".mp3,.wav" />
            </button>
          </div>
        </div>
      </main>
    </>
  );
}
