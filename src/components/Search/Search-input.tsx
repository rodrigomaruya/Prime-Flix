import "./search-input.css";
import { useState } from "react";
import { Link } from "react-router-dom";
export function SearchInput() {
  const [search, setSearch] = useState("");

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
  };
  return (
    <div className="search">
      <form onSubmit={handleSearch} className="search-container">
        <input
          type="text"
          placeholder="Pesquisar"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">
          <Link to={`/search/${search}`}>Pesquisar</Link>
        </button>
      </form>
    </div>
  );
}
