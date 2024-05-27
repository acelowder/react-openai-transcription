import { FaPlus, FaMicrophone } from "react-icons/fa";

import "./App.css";

export default function App() {
  const arrow = <b style={{ fontWeight: 1000 }}>&rarr;</b>;

  return (
    <>
      <header>
        <h2>
          Sound<span>Scribe</span>
        </h2>
        <button>
          <h3>New</h3> <FaPlus />
        </button>
      </header>
      <main>
        <div className="title">
          <h1>SoundScribe</h1>
          <h2>
            Record {arrow} Transcribe {arrow} Translate
          </h2>
        </div>
      </main>
    </>
  );
}
