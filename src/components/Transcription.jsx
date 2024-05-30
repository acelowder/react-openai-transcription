import "./Transcription.css";

export function Transcription({ transcription }) {
  return (
    <div className="transcription">
      {transcription.map((t, i) => (
        <p key={i}>{t.text}</p>
      ))}
    </div>
  );
}
