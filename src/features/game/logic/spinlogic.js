import { getWinner } from "../../utils/wheelMath";
import { getRandomIntInclusive } from "../../utils/random";

export function spinWheel(sections) {
  if (!Array.isArray(sections) || sections.length === 0) {
    return {
      winner: null,
      rotation: 0,
    };
  }

  const winner = getWinner(sections);
  if (!winner) {
    return {
      winner: null,
      rotation: 0,
    };
  }

  /*
    El ganador debe quedar en el mismo punto del marcador final.
    Ajustamos el ángulo central de la sección seleccionada para que coincida con 270°.
  */
  const centerAngle = winner.degree + winner.size / 2 - 90;
  const targetAngle = 270 - centerAngle;

  /*
    Agregamos vueltas extras para que el giro se vea más largo y natural.
  */
  const spins = getRandomIntInclusive(10, 15);
  const extraSpins = 360 * spins;

  return {
    winner,
    rotation: extraSpins + targetAngle,
  };
}
