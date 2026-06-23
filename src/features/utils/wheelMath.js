// Calcula el ganador de la ruleta según las probabilidades de cada sección.
export function getWinner(data) {
  const total = data.reduce((acc, item) => acc + item.probability, 0);
  const random = Math.random() * total;

  let accumulated = 0;
  for (const item of data) {
    accumulated += item.probability;
    if (random <= accumulated) {
      return item;
    }
  }

  return data[0] || null;
}
