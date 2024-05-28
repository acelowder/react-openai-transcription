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
        <Recording
          onUpload={(e) => setFile(e.target.files[0])}
          file={file}
          recording={recording}
        />
      </main>
    </>
  );
}
