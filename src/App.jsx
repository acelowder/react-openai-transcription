import { Card } from "./components/Card";
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
          <Card
            pills={[{ text: "Duration", highlight: true }, { text: "MP3" }]}
            buttonIcon={<FaMicrophone />}
          >
            Record your voice
          </Card>
          <Card
            pills={[{ text: "MP3" }, { text: "WAV" }]}
            buttonIcon={<FaFileUpload />}
          >
            Upload a file
          </Card>
        </div>
      </main>
    </>
  );
}
