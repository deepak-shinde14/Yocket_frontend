import React from 'react';
import './CityCard.css';

function CityCard({ city, isSelected, onSelect, disabled }) {
  return (
    <div 
      className={`city-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onSelect : null}
    >
      <h3>{city.name}</h3>
      <p>Distance: {city.distance} KM</p>
      <p className="description">{city.description}</p>
    </div>
  );
}

export default CityCard;