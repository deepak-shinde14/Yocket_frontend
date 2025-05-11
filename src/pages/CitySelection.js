import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';
import CityCard from '../components/CityCard';
import './CitySelection.css';

function CitySelection() {
  const { gameState, setGameState } = useContext(GameContext);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch cities from backend
    fetch('https://yocket-backend-ih3k.onrender.com/api/game/cities')
      .then(res => res.json())
      .then(data => {
        setCities(data);
        setLoading(false);
      });
  }, []);

  const selectCity = (copIndex, cityName) => {
    const updatedCops = [...gameState.cops];
    updatedCops[copIndex].city = cityName;
    setGameState({ ...gameState, cops: updatedCops });
  };

  const proceedToVehicles = () => {
    // Check if all cops have selected unique cities
    const selectedCities = gameState.cops.map(cop => cop.city).filter(Boolean);
    const uniqueCities = new Set(selectedCities);
    
    if (uniqueCities.size === 3) {
      navigate('/vehicles');
    } else {
      alert('Please select unique cities for each cop!');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="city-selection">
      <h2>Select Cities for Each Cop</h2>
      <div className="cops-container">
        {gameState.cops.map((cop, copIndex) => (
          <div key={copIndex} className="cop-selection">
            <h3>{cop.name}</h3>
            <div className="city-cards">
              {cities.map(city => (
                <CityCard
                  key={city.name}
                  city={city}
                  isSelected={cop.city === city.name}
                  onSelect={() => selectCity(copIndex, city.name)}
                  disabled={gameState.cops.some(c => c.city === city.name && c.name !== cop.name)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button onClick={proceedToVehicles}>Proceed to Vehicle Selection</button>
    </div>
  );
}

export default CitySelection;