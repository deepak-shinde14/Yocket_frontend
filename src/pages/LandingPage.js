import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const startGame = () => {
    navigate('/cities');
  };

  return (
    <div className="landing-container">
      <h1>Fugitive Capture Game</h1>
      <p>A notorious criminal escape artist has vanished again. Help our 3 fearless cops capture the fugitive!</p>
      <button onClick={startGame}>Start Game</button>
    </div>
  );
}

export default LandingPage;