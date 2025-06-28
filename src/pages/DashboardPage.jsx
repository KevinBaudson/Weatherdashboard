import { useEffect, useRef, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../../src/components/layout/Header.jsx";
import TemperatureChart from "../components/charts/TemperatureChart";
import HumidityChart from "../components/charts/HumidityChart";
import WindChart from "../components/charts/WindChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import CapitalWeatherCard from "../components/cards/CapitalWeatherCard.jsx";

import {
  getForecastByCity,
  getWeatherByCapital,
} from "../services/weatherService";

import "../../src/components/styles/variables.css";
import "../../src/components/styles/layout.css";
import "../../src/components/styles/components.css";

export default function DashboardPage() {
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("São Paulo");

  const [capitalsWeather, setCapitalsWeather] = useState([]);
  const [loadingCapitals, setLoadingCapitals] = useState(false);
  const [errorCapitals, setErrorCapitals] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const cardsRef = useRef(null);

  const handleToggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const capitals = [
    "Brasília",
    "São Paulo",
    "Rio de Janeiro",
    "Belo Horizonte",
    "Vitória",
    "Salvador",
    "Porto Alegre",
    "Curitiba",
    "Recife",
    "Fortaleza",
    "Manaus",
  ];

  useEffect(() => {
    getForecastByCity(city).then((data) => {
      setForecast(data.list.slice(0, 8));
    });
  }, [city]);

  useEffect(() => {
    async function fetchCapitalsWeather() {
      setLoadingCapitals(true);
      setErrorCapitals(null);
      try {
        const data = await getWeatherByCapital(capitals);
        setCapitalsWeather(data);
      } catch (error) {
        setErrorCapitals(
          error.message || "Erro ao carregar clima das capitais"
        );
      } finally {
        setLoadingCapitals(false);
      }
    }
    fetchCapitalsWeather();
  }, []);

  const scrollCards = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollLeft += 300; // valor ajustável
    }
  };

  const scrollLeft = () => {
    if (cardsRef.current) {
      cardsRef.current.scrollLeft -= 300;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        onCitySelect={setCity}
        isOpen={isSidebarOpen}
        onToggle={handleToggleSidebar}
      />
      <div className="main-content">
        <Header
          city={city}
          onSearch={setCity}
          onToggleSidebar={handleToggleSidebar}
        />

        <div className="charts">
          <div className="chart">
            <TemperatureChart forecast={forecast} />
          </div>
          <div className="chart">
            <HumidityChart forecast={forecast} />
          </div>
          <div className="chart">
            <WindChart forecast={forecast} />
          </div>
          <div className="chart">
            <DoughnutChart forecast={forecast} />
          </div>
        </div>

        <section style={{ marginTop: "2rem" }}>
          <h2>Clima das Capitais Brasileiras</h2>
          {loadingCapitals && <p>Carregando dados...</p>}
          {errorCapitals && <p style={{ color: "red" }}>{errorCapitals}</p>}

          <div className="cards-wrapper" style={{ position: "relative" }}>
            <button className="scroll-prev" onClick={scrollLeft}>
              <i className="fas fa-chevron-left"></i>
            </button>

            <div className="container-cards" ref={cardsRef}>
              {capitalsWeather.map((cityData) => (
                <CapitalWeatherCard
                  key={cityData.id}
                  city={cityData.name}
                  temp={cityData.main.temp}
                  feelsLike={cityData.main.feels_like}
                  description={cityData.weather[0].description}
                  icon={cityData.weather[0].icon}
                  humidity={cityData.main.humidity}
                  windSpeed={cityData.wind.speed}
                />
              ))}
            </div>

            <button className="scroll-next" onClick={scrollCards}>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
