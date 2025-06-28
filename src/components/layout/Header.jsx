import { useState } from "react";

export default function Header({ city, onSearch, onToggleSidebar }) {
  const [search, setSearch] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search.trim());
      setSearch("");
    }
  };
  return (
    <div className="header">
      <div className="box-logo">
        <button className="mobile-menu-btn" onClick={onToggleSidebar}>
          <i className="fas fa-bars"></i>
        </button>
        <h2>
          <i className="fas fa-cloud-sun"></i> Clima - {city}
        </h2>
      </div>
      <form className="search-input" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome da cidade"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          
        />
        <button type="submit" aria-label="Buscar cidade">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </div>
  );
}
