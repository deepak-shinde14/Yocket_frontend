import React from 'react';
import './VehicleCard.css';

function VehicleCard({ vehicle, isSelected, onSelect, disabled, requiredRange }) {
  return (
    <div 
      className={`vehicle-card ${isSelected ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
      onClick={!disabled ? onSelect : null}
    >
      <h3>EV {vehicle.type.toUpperCase()}</h3>
      <p>Range: {vehicle.range} KM</p>
      <p>Available: {vehicle.count}</p>
      {requiredRange && (
        <p className={vehicle.range >= requiredRange ? 'sufficient' : 'insufficient'}>
          {vehicle.range >= requiredRange ? '✓ Sufficient' : '✗ Insufficient'} for round trip
        </p>
      )}
    </div>
  );
}

export default VehicleCard;