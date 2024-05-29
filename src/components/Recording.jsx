import { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import "./Recording.css";

export function Recording({ setRecording, onUpload, file, recording }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorderRef = useRef(null);

  const startRecordingHandler = async () => {
    setIsRecording(true);

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    const media = new MediaRecorder(stream, { type: "audio/webm" });
    mediaRecorderRef.current = media;

    mediaRecorderRef.current.start();
    const localAudioChunks = [];
    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecordingHandler = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
    mediaRecorderRef.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      setRecording(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  };

  useEffect(() => {
    if (!isRecording) return;

    const intervalId = setInterval(() => setDuration((prev) => prev + 1), 1000);

    return () => clearInterval(intervalId);
  }, [isRecording]);

  const arrow = <b style={{ fontWeight: 1000 }}>&rarr;</b>;

  return (
    <section className={file || recording ? "hidden" : "fade-in"}>
      <div className="title">
        <h1 className="test">
          Sound<span className="primary">Scribe</span>
        </h1>
        <h2>
          Record {arrow} Transcribe {arrow} Translate
        </h2>
      </div>
      <button
        className="record-button"
        onClick={isRecording ? stopRecordingHandler : startRecordingHandler}
      >
        <h3>{isRecording ? "Stop Recording" : "Record"}</h3>
        <div className="record-visuals">
          {isRecording && <p>{duration}s</p>}
          <h3 className="">
            <span className={`icon ${isRecording ? "action-hightlight" : ""}`}>
              <FaMicrophone />
            </span>
          </h3>
        </div>
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
