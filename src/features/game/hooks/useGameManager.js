import { useRef, useState } from "react";
import {
  consumeShotForPlayer,
  createInitialPlayers,
  getNextTurnIndex,
  markJokerUsed,
} from "../logic/gameManagerHelpers.js";

function useGameManager() {
  const [players, setPlayers] = useState(createInitialPlayers);
  const [currentTurn, setCurrentTurn] = useState(0);
  const [turnRedirected, setTurnRedirected] = useState(false);
  const [gameOverPlayer, setGameOverPlayer] = useState(null);
  const gameOverRef = useRef(false);

  const beginSpin = () => {
    if (gameOverRef.current) return currentTurn;
    setTurnRedirected(false);
    return currentTurn;
  };

  const completeSpin = () => {
    if (gameOverRef.current) return currentTurn;

    if (turnRedirected) {
      setTurnRedirected(false);
      return currentTurn;
    }

    setCurrentTurn((prev) => getNextTurnIndex(prev, players.length));
  };

  const redirectTurn = (targetIndex) => {
    if (gameOverRef.current) return;
    setCurrentTurn(targetIndex);
    setTurnRedirected(true);
  };

  const handleUseJoker = (playerIndex, jokerType) => {
    if (gameOverRef.current) return;

    setPlayers((prev) =>
      prev.map((player, index) =>
        index === playerIndex ? markJokerUsed(player, jokerType) : player,
      ),
    );
  };
  const failTurnEffect = (playerId) => {
    if (gameOverRef.current) return;

    setPlayers((prev) =>
      prev.map((player) => {
        if (player.id !== playerId) return player;

        const nextPlayer = consumeShotForPlayer(player);

        if (
          player.shots > 0 &&
          nextPlayer.shots === 0 &&
          !player.protectionArmed
        ) {
          gameOverRef.current = true;
          setGameOverPlayer(player);
        }

        return nextPlayer;
      }),
    );
  };

  const consumeShot = () => {
    if (gameOverRef.current) return;

    setPlayers((prev) =>
      prev.map((player, index) => {
        if (index !== currentTurn) return player;

        const nextPlayer = consumeShotForPlayer(player);
        if (
          player.shots > 0 &&
          nextPlayer.shots === 0 &&
          !player.protectionArmed
        ) {
          gameOverRef.current = true;
          setGameOverPlayer(player);
        }

        return nextPlayer;
      }),
    );
  };

  return {
    players,
    currentTurn,
    gameOverPlayer,
    beginSpin,
    completeSpin,
    redirectTurn,
    consumeShot,
    handleUseJoker,
    failTurnEffect,
  };
}

export default useGameManager;