import { createJokerSlots } from "../data/jokers.js";

export function createInitialPlayers() {
  return [
    {
      id: 1,
      name: "Jugador 1",
      shots: 5,
      maxShots: 5,
      jokers: createJokerSlots(),
      protectionArmed: false,
    },
    {
      id: 2,
      name: "Jugador 2",
      shots: 5,
      maxShots: 5,
      jokers: createJokerSlots(),
      protectionArmed: false,
    },
  ];
}

export function markJokerUsed(player, jokerType) {
  const nextJokers = player.jokers.map((joker) =>
    joker.type === jokerType ? { ...joker, used: true } : joker,
  );

  return {
    ...player,
    jokers: nextJokers,
    protectionArmed: jokerType === "shield" ? true : player.protectionArmed,
  };
}

export function consumeShotForPlayer(player) {
  if (player.protectionArmed) {
    return {
      ...player,
      protectionArmed: false,
    };
  }

  return {
    ...player,
    shots: Math.max(0, player.shots - 1),
  };
}

export function getNextTurnIndex(currentTurn, playerCount) {
  return (currentTurn + 1) % playerCount;
}
