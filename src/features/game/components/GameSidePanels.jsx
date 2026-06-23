import SidePanelLives from "./panels/SidePanelLives.jsx";
import SidePanelJokers from "./panels/SidePanelJokers.jsx";

function GameSidePanels({ player, isActive }) {
  return (
    <aside className={`sidePanel ${isActive ? "activeTurn" : ""}`}>
      <p className={`playerTag playerTag-${player.id}`}>Jugador {player.id}</p>

      <p className="turnText">{isActive ? "Turno actual" : "En espera"}</p>

      <SidePanelLives
        playerId={player.id}
        shots={player.shots}
        maxShots={player.maxShots}
      />

      <SidePanelJokers playerId={player.id} jokers={player.jokers} />
    </aside>
  );
}

export default GameSidePanels;
