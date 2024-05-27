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
        <section>
          <div className="title">
            <h1>
              Sound<span>Scribe</span>
            </h1>
            <h2>
              Record {arrow} Transcribe {arrow} Translate
            </h2>
          </div>
          <button className="record-button">
            <h3>Record</h3>
            <FaMicrophone />
          </button>
          <h3>
            Or{" "}
            <label>
              upload
              <input hidden={true} type="file" accept=".mp3, .wav" />
            </label>{" "}
            an audio file
          </h3>
        </section>
      </main>
    </>
  );
}
