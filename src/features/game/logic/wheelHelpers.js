// Normaliza las probabilidades de cada sección para que sumen 1.
export function normalizeProbabilities(sections) {
  const total = sections.reduce((acc, section) => acc + section.probability, 0);

  return sections.map((section) => ({
    ...section,
    normalized: total > 0 ? section.probability / total : 0,
  }));
}
