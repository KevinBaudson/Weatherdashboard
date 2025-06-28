import { useState } from "react";

export default function Sidebar({ onCitySelect, isOpen, onToggle }) {
  const cities = [
    "São Paulo",
    "Belo Horizonte",
    "Rio de Janeiro",
    "Manaus",
    "Sergipe",
    "Nova York",
    "Tóquio",
    "Londres",
  ];

  return (
    <>
      <div className={`sidebar ${isOpen ? "expanded" : "collapsed"}`}>
        <h5>
          <i className="fas fa-city"></i>
          {isOpen && <span>Cidades</span>}
        </h5>

        <div className="content-sidebar">
          <ul className="list-unstyled list-capital">
            {cities.map((city) => (
              <li key={city}>
                <button
                  onClick={() => {
                    onCitySelect(city);
                    onToggle(); // Fecha o sidebar ao selecionar cidade
                  }}
                >
                  <i className="fas fa-map-marker-alt"></i>{" "}
                  {isOpen && <span>{city}</span>}
                </button>
              </li>
            ))}
          </ul>

          <button className="icon" onClick={onToggle}>
            <i
              className={`fas ${
                isOpen ? "fa-chevron-left" : "fa-chevron-right"
              }`}
            ></i>
          </button>
        </div>
      </div>

      {/* Overlay escura visível somente no mobile */}
      {isOpen && <div className="overlay" onClick={onToggle}></div>}
    </>
  );
}