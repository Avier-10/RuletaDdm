import { getRandomItem } from "../../utils/random";

// Devuelve un elemento aleatorio dentro de un arreglo.
export function getRandomQuestion(questions) {
  return getRandomItem(questions);
}
