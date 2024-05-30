import { LANGUAGES } from "../utils/presets";
import { FaSpinner } from "react-icons/fa";
import "./Translation.css";

export function Translation({
  translation,
  translating,
  language,
  onTranslate,
  onLanguageChange,
}) {
  return (
    <div className="translation">
      <div className="language-select">
        <select value={language} onChange={onLanguageChange}>
          <option value={"Select language"}>Select language</option>
          {Object.entries(LANGUAGES).map(([key, value]) => (
            <option key={key} value={value}>
              {key}
            </option>
          ))}
        </select>
        <button className="action" onClick={onTranslate}>
          <h3>Translate</h3>
        </button>
      </div>
      {translation &&
        !translating &&
        translation.map((t, i) => <p key={i}>{t.translation_text}</p>)}
      {translating && (
        <span className="spinning">
          <FaSpinner />
        </span>
      )}
    </div>
  );
}
