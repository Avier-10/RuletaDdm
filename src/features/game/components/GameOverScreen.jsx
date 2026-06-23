function GameOverScreen({ playerName, onRestart }) {
  return (
    <div className="gameOverScreen">
      <div className="gameOverCard">
        <p className="gameOverLabel">Fin del juego</p>
        <h2>Haz perdido {playerName}</h2>
        <p className="gameOverText">
          Ya no quedan vidas. Recargá la página para volver a jugar.
        </p>
        <button type="button" onClick={onRestart} className="gameOverButton">
          Recargar página
        </button>
      </div>
    </div>
  );
}

export default GameOverScreen;
