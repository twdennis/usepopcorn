export function Search({ query, setQuery }) {
  function handleClearSearch() {
    setQuery("");
  }
  return (
    <div className="search-container">
      <input
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
