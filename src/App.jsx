import { useState } from "react";

import { Header } from "./components/Header";
import { Recording } from "./components/Recording";
import { FileDisplay } from "./components/FileDisplay";
import { Transcription } from "./components/Transcription";

import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(null);

  const [loading, setLoading] = useState(false);

  return (
    <>
      <Header />
      <main>
        <Recording
          setRecording={setRecording}
          onUpload={(e) => setFile(e.target.files[0])}
          file={file}
          recording={recording}
        />
        <FileDisplay
          onReset={() => {
            setFile(null);
            setRecording(null);
          }}
          file={file}
          recording={recording}
          onTranscribe={() => setLoading(true)}
          loading={loading}
        />
        <Transcription loading={loading} />
      </main>
    </>
  );
}
