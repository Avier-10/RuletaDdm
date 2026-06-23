import reflectIcon from "../../../assets/images/otherside.svg";
import swapIcon from "../../../assets/images/alter.svg";
import shieldIcon from "../../../assets/images/defence.svg";

export const JOKER_DEFINITIONS = [
  {
    type: "reflect",
    label: "Reflejar",
    description:
      "Pasa el reto o la pregunta al otro jugador y cambia el turno.",
    icon: reflectIcon,
    target: "other-player",
    effect: "redirect-turn",
  },
  {
    type: "swap",
    label: "Cambiar",
    description:
      "Si cae Verdad la convierte en Reto, y si cae Reto la convierte en Verdad.",
    icon: swapIcon,
    target: "current-result",
    effect: "swap-content",
  },
  {
    type: "shield",
    label: "Proteccion",
    description: "Evita perder una vida al usar Saltar.",
    icon: shieldIcon,
    target: "current-player",
    effect: "block-skip-shot",
  },
];

export function createJokerSlots() {
  return JOKER_DEFINITIONS.map((joker) => ({
    type: joker.type,
    label: joker.label,
    description: joker.description,
    icon: joker.icon,
    effect: joker.effect,
    used: false,
  }));
}

export function getJokerDefinition(type) {
  return JOKER_DEFINITIONS.find((joker) => joker.type === type);
}

export function getJokerLabel(type) {
  return getJokerDefinition(type)?.label ?? "Comodin";
}