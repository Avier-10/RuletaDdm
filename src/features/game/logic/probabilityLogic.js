// Actualiza la probabilidad de una sección sin mutar el arreglo original.
export function updateProbability(sections, sectionId, newProbability) {
  return sections.map((section) =>
    section.id === sectionId
      ? {
          ...section,
          probability: Number(newProbability),
        }
      : section,
  );
}
