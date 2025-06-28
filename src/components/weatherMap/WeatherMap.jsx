import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { getWeatherTileURL } from '../../services/weatherService';

const WeatherMap = ({ coords }) => {
  return (
    <div style={{ width: '100%', height: '500px', position: 'relative', borderRadius: '10px', overflow: 'hidden' }}>
      <MapContainer
        center={[coords.lat, coords.lon]}
        zoom={7}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
      >
        
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        
        <TileLayer
          url={getWeatherTileURL('temp_new')}
          attribution="&copy; OpenWeatherMap"
        />
      </MapContainer>

      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          padding: '8px 12px',
          background: '#ffffffcc',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
        title="Pesquisar"
      >
        <i className="fas fa-search"></i>
      </button>
    </div>
  );
};

export default WeatherMap;
