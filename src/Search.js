import { useEffect, useRef } from "react";
import { useKey } from "./useKey";

export function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  function handleClearSearch() {
    setQuery("");
  }

  useKey("Enter", function () {
    if (document.activeElement === inputEl.current) return;
    inputEl.current.focus();
    handleClearSearch();
  });

  return (
    <div className="search-container">
      <input
        ref={inputEl}
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button className="clear-search" onClick={handleClearSearch}>
        ╳
      </button>
    </div>
  );
}
