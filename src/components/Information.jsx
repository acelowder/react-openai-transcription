import { useEffect, useState, useRef } from "react";
import { Transcription } from "./Transcription";
import { Translation } from "./Translation";
import { MessageTypes } from "../utils/presets";
import { FaCopy, FaDownload } from "react-icons/fa";
import "./Information.css";

export function Information({ loading, transcription }) {
  const [tab, setTab] = useState(0);
  const [translation, setTranslation] = useState(null);
  const [language, setLanguage] = useState("Select language");
  const [translating, setTranslating] = useState(false);

  const worker = useRef(null);

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(
        new URL("../utils/translate.worker.js", import.meta.url),
        {
          type: "module",
        }
      );
    }

    const onMessageReceived = (e) => {
      if (e.data.type === MessageTypes.RESULT) {
        console.log(e.data.translation);
        setTranslation(e.data.translation);
        setTranslating(false);
      } else {
        setTranslating(true);
      }
    };

    worker.current.addEventListener("message", onMessageReceived);

    return () => {
      worker.current.removeEventListener("message", onMessageReceived);
    };
  });

  const handleCopy = () => {
    if (tab === 0) {
      navigator.clipboard.writeText(
        transcription?.map((t) => t.text).join("\n")
      );
    } else {
      navigator.clipboard.writeText(
        translation?.map((t) => t.translation_text).join("\n")
      );
    }
  };

  const handleDownload = () => {
    let text;
    let filename = new Date().toISOString().slice(0, 10);
    if (tab === 0) {
      text = transcription?.map((t) => t.text).join("\n");
      filename = "transcription_" + filename + ".txt";
    } else {
      text = translation?.map((t) => t.translation_text).join("\n");
      filename = "translation_" + filename + ".txt";
    }

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleTranslate = async () => {
    if (translating || language === "Select language") return;
    setTranslating(true);

    worker.current.postMessage({
      text: transcription.map((t) => t.text),
      source_language: "eng_Latn",
      target_language: language,
    });
  };

  return (
    <section className={loading ? "fade-in" : "hidden"}>
      <div className="title">
        <h1>
          Your{" "}
          <span className={tab === 0 ? "success" : "action"}>
            {tab === 0 ? "Transcription" : "Translation"}
          </span>
        </h1>
      </div>
      {!transcription && (
        <div className="loading">
          <h3>Transcribing...</h3>
          {[0, 1, 2].map((i) => (
            <div className={`loading-bar loading-${i}`} key={i} />
          ))}
        </div>
      )}
      <div className={`content ${transcription ? "fade-in" : "hidden"}`}>
        <div className="tab-menu">
          <button
            className={`tab ${tab === 0 ? `active-0` : ""}`}
            onClick={() => setTab(0)}
          >
            <h3>Transcription</h3>
          </button>
          <button
            className={`tab ${tab === 1 ? "active-1" : ""}`}
            onClick={() => setTab(1)}
          >
            <h3>Translation</h3>
          </button>
        </div>
        {tab === 0 && transcription ? (
          <Transcription transcription={transcription} />
        ) : (
          <Translation
            translation={translation}
            translating={translating}
            language={language}
            onTranslate={handleTranslate}
            onLanguageChange={(e) => setLanguage(e.target.value)}
          />
        )}
        <div className="toolbar">
          <button onClick={handleCopy}>
            <h3>
              <FaCopy />
            </h3>
          </button>
          <p> </p>
          <button onClick={handleDownload}>
            <h3>
              <FaDownload />
            </h3>
          </button>
        </div>
      </div>
    </section>
  );
}
