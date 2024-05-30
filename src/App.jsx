import { useState, useRef, useEffect } from "react";

import { Header } from "./components/Header";
import { Recording } from "./components/Recording";
import { FileDisplay } from "./components/FileDisplay";
import { Information } from "./components/Information";

import { MessageTypes } from "./utils/presets";

import "./App.css";

export default function App() {
  const [file, setFile] = useState(null);
  const [recording, setRecording] = useState(null);
  const [transcription, setTranscription] = useState(null);

  const [loading, setLoading] = useState(false);

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("./utils/whisper.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = (e) => {
      if (e.data.type === MessageTypes.RESULT) {
        setTranscription(e.data.results);
        console.log(e.data.results);
      } else {
        setLoading(true);
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () => {
      worker.current.removeEventListener("message", onMessageReceived);
    };
  });

  const decodeAudio = async (sample) => {
    const audioContext = new AudioContext({ sampleRate: 16000 });
    const audioBuffer = await sample.arrayBuffer();
    const decoded = await audioContext.decodeAudioData(audioBuffer);
    const audio = decoded.getChannelData(0);
    return audio;
  };

  const handleFormSubmission = async () => {
    let audio = await decodeAudio(file ? file : recording);

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
    });
  };

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
          onTranscribe={handleFormSubmission}
          loading={loading}
        />
        <Information loading={loading} transcription={transcription} />
      </main>
    </>
  );
}
