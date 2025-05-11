import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import CitySelection from './pages/CitySelection';
import VehicleSelection from './pages/VehicleSelection';
import ResultsPage from './pages/ResultsPage';
import GameContext from './context/GameContext';

function App() {
  const [gameState, setGameState] = useState({
    cops: [
      { name: 'Cop 1', city: null, vehicle: null },
      { name: 'Cop 2', city: null, vehicle: null },
      { name: 'Cop 3', city: null, vehicle: null }
    ],
    availableVehicles: [],
    result: null
  });

  return (
    <GameContext.Provider value={{ gameState, setGameState }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/cities" element={<CitySelection />} />
          <Route path="/vehicles" element={<VehicleSelection />} />
          <Route path="/results" element={<ResultsPage />} />
        </Routes>
      </Router>
    </GameContext.Provider>
  );
}

export default App;