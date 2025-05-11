import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import GameContext from '../context/GameContext';
import './ResultsPage.css';

function ResultsPage() {
  const { gameState } = useContext(GameContext);
  const navigate = useNavigate();

  const playAgain = () => {
    navigate('/');
  };

  return (
    <div className="results-container">
      <h1>Capture Results</h1>
      
      {gameState.result?.success ? (
        <div className="success">
          <h2>Success!</h2>
          <p>{gameState.result.capturingCop} captured the fugitive in {gameState.result.fugitiveLocation}!</p>
        </div>
      ) : (
        <div className="failure">
          <h2>Mission Failed</h2>
          <p>The fugitive escaped! They were hiding in {gameState.result?.fugitiveLocation}.</p>
        </div>
      )}
      
      <button onClick={playAgain}>Play Again</button>
    </div>
  );
}

export default ResultsPage;