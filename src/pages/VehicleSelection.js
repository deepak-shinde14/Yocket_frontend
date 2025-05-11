import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';
import VehicleCard from '../components/VehicleCard';
import './VehicleSelection.css';

function VehicleSelection() {
  const { gameState, setGameState } = useContext(GameContext);
  const [vehicles, setVehicles] = useState([]);
  const [cities, setCities] = useState([]); // Add cities state
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch both cities and vehicles
    Promise.all([
      fetch('https://yocket-backend-ih3k.onrender.com/api/game/cities').then(res => res.json()),
      fetch('https://yocket-backend-ih3k.onrender.com/api/game/vehicles').then(res => res.json())
    ])
    .then(([citiesData, vehiclesData]) => {
      setCities(citiesData);
      setVehicles(vehiclesData);
      setLoading(false);
    });
  }, []);

  const selectVehicle = (copIndex, vehicleType) => {
    const updatedCops = [...gameState.cops];
    updatedCops[copIndex].vehicle = vehicleType;
    
    // Update vehicle availability
    const updatedVehicles = vehicles.map(vehicle => {
      if (vehicle.type === vehicleType) {
        return { ...vehicle, count: vehicle.count - 1 };
      }
      return vehicle;
    });
    
    setGameState({ 
      ...gameState, 
      cops: updatedCops,
      availableVehicles: updatedVehicles
    });
    setVehicles(updatedVehicles);
  };

  const checkCapture = async () => {
    // Prepare data for backend
    const copChoices = gameState.cops.map(cop => ({
      copName: cop.name,
      city: cop.city,
      vehicle: cop.vehicle
    }));

    const response = await fetch('https://yocket-backend-ih3k.onrender.com/api/game/check', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ copChoices }),
    });

    const result = await response.json();
    setGameState(prev => ({ ...prev, result }));
    navigate('/results');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="vehicle-selection">
      <h2>Select Vehicles for Each Cop</h2>
      <div className="cops-container">
        {gameState.cops.map((cop, copIndex) => {
          const selectedCity = cities.find(c => c.name === cop.city);
          return (
            <div key={copIndex} className="cop-selection">
              <h3>{cop.name} - {cop.city} ({selectedCity?.distance} KM)</h3>
              <div className="vehicle-cards">
                {vehicles.map(vehicle => (
                  <VehicleCard
                    key={vehicle.type}
                    vehicle={vehicle}
                    isSelected={cop.vehicle === vehicle.type}
                    onSelect={() => selectVehicle(copIndex, vehicle.type)}
                    disabled={
                      vehicle.count <= 0 || 
                      vehicle.range < selectedCity.distance * 2
                    }
                    requiredRange={selectedCity.distance * 2}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
      <button 
        onClick={checkCapture}
        disabled={gameState.cops.some(cop => !cop.vehicle)}
      >
        Check Capture
      </button>
    </div>
  );
}

export default VehicleSelection;