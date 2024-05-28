import { useState, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import "./Recording.css";

export function Recording({ setRecording, onUpload, file, recording }) {
  const [isRecording, setIsRecording] = useState(false);
  const [audioChunks, setAudioChunks] = useState([]);
  const [duration, setDuration] = useState(0);

  const mediaRecorder = useRef(null);

  const startRecording = async () => {
    let tempStream;

    console.log("Recording...");

    try {
      const streamData = navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      tempStream = await streamData;
    } catch (err) {
      console.log(err);
    }
    setIsRecording(true);

    const media = new MediaRecorder(tempStream, { type: "audio/webm" });
    mediaRecorder.current = media;

    mediaRecorder.current.start();
    let localAudioChunks = [];
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;

      localAudioChunks.push(event.data);
    };
    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    setIsRecording(false);
    console.log("Recording stopped");

    mediaRecorder.current.stop();
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
      setRecording(audioBlob);
      setAudioChunks([]);
      setDuration(0);
    };
  };

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  });

  const arrow = <b style={{ fontWeight: 1000 }}>&rarr;</b>;

  return (
    <section className={file || recording ? "hidden" : "fade-in"}>
      <div className="title">
        <h1>
          Sound<span className="primary">Scribe</span>
        </h1>
        <h2>
          Record {arrow} Transcribe {arrow} Translate
        </h2>
      </div>
      <button
        className="record-button"
        onClick={isRecording ? stopRecording : startRecording}
      >
        <h3>{isRecording ? "Stop Recording" : "Record"}</h3>
        <div className="record-visuals">
          {isRecording && <p>{duration}</p>}
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
