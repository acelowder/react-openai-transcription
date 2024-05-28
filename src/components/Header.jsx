import "./Header.css";
import { FaPlus } from "react-icons/fa";

export function Header() {
  return (
    <>
      <header>
        <h2>
          Sound<span>Scribe</span>
        </h2>
        <button>
          <h3>New</h3>
          <FaPlus />
        </button>
      </header>
    </>
  );
}
