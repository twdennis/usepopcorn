export function SearchPrompt({ query }) {
  return (
    <p className="search-prompt">
      {query.length === 0 ? "Search for a movie..." : "Keep typing..."}
    </p>
  );
}
