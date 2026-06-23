import { useState } from "react";
import Wheel from "./features/game/components/Wheel.jsx";
import SettingsModal from "./features/game/components/modals/SettingsModal.jsx";
import GameSidePanels from "./features/game/components/GameSidePanels.jsx";
import GameOverScreen from "./features/game/components/GameOverScreen.jsx";
import useGameManager from "./features/game/hooks/useGameManager.js";
import { wheelData } from "./features/game/data/wheelData.js";
import WinnerCard from "./features/game/components/WinnerCard.jsx";
import InstructionsModal from "./features/game/components/instructions/InstructionsModal.jsx";

import HelpIcon from "./assets/images/interrogacion.svg";


import "./features/game/styles/animations.css";
import "./features/game/styles/footer.css";
import "./features/game/styles/global.css";
import "./features/game/styles/gameOver.css";
import "./features/game/styles/wheel.css";
import "./features/game/styles/jokers.css";
import "./features/game/styles/gameSidePanels.css";
import "./App.css";

function App() {
  const [sections, setSections] = useState(wheelData);
  const [winner, setWinner] = useState('Click en "Girar" para iniciar');
  const [isRolling, setIsRolling] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isInstructionsOpen, setIsInstructionsOpen] = useState(false);
  const {
    players,
    currentTurn,
    gameOverPlayer,
    beginSpin,
    completeSpin,
    redirectTurn,
    consumeShot,
    handleUseJoker,
    failTurnEffect,
  } = useGameManager();

  if (gameOverPlayer) {
    return (
      <GameOverScreen
        playerName={gameOverPlayer.name}
        onRestart={() => window.location.reload()}
      />
    );
  }

  return (
    <>
      <button
        className="helpButton"
        onClick={() => setIsInstructionsOpen(true)}
      >
        <img src={HelpIcon} alt="Ayuda" />
      </button>

      <div className="topButtons">
        <button
          className="settingsButton"
          onClick={() => setIsSettingsOpen(true)}
        >
          Config
        </button>
      </div>

      <div id="container">
        <div className="gameBoard">
          <GameSidePanels player={players[0]} isActive={currentTurn === 0} />

          <div className="wheelArea">
            <WinnerCard winner={winner} isRolling={isRolling} />

            <Wheel
              sections={sections}
              setWinner={setWinner}
              setIsRolling={setIsRolling}
              currentTurn={currentTurn}
              playerCount={players.length}
              activePlayer={players[currentTurn]}
              onSpinStart={beginSpin}
              onSpinComplete={completeSpin}
              onSkip={consumeShot}
              onUseJoker={handleUseJoker}
              onRedirectTurn={redirectTurn}
              onEffectFailed={failTurnEffect}
            />
          </div>

          <GameSidePanels player={players[1]} isActive={currentTurn === 1} />
        </div>
      </div>

      {isSettingsOpen && (
        <SettingsModal
          sections={sections}
          setSections={setSections}
          onClose={() => setIsSettingsOpen(false)}
        />
      )}

      {isInstructionsOpen && (
        <InstructionsModal onClose={() => setIsInstructionsOpen(false)} />
      )}
    </>
  );
}

export default App;