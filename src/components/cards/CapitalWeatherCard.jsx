const CapitalWeatherCard = ({
  city,
  temp,
  feelsLike,
  description,
  icon,
  humidity,
  windSpeed,
}) => {
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
   <div className="card">
  <div className="img-card">
    <img src={iconUrl} alt={description} />
  </div>

  <div>
    <h5>{city}</h5>
    <small>{description}</small>
  </div>

  <div className="metrics">
    <div>
      <strong>{Math.round(temp)}°C</strong>
      <span>Sensação: {Math.round(feelsLike)}°C</span>
    </div>

    <div>
      <span>Umid: {humidity}%</span>
      <span>Vento: {windSpeed} m/s</span>
    </div>
  </div>
</div>

  );
};

export default CapitalWeatherCard;
