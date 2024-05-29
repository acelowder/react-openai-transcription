import { FaPlus } from "react-icons/fa";

export function Header() {
  return (
    <header>
      <a href="/">
        <h2>
          Sound<span className="primary">Scribe</span>
        </h2>
      </a>
      <a href="/">
        <button>
          <h3>New</h3>
          <h2 className="icon">
            <FaPlus />
          </h2>
        </button>
      </a>
    </header>
  );
}
