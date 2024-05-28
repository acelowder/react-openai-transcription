import { FaPlus } from "react-icons/fa";

export function Header() {
  return (
    <>
      <header>
        <h2>
          Sound<span className="primary">Scribe</span>
        </h2>
        <button>
          <h3>New</h3>
          <h4 className="icon">
            <FaPlus />
          </h4>
        </button>
      </header>
    </>
  );
}
