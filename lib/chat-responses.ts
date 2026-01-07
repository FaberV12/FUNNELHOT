// Respuestas simuladas para el chat, solo usé las más comunes y que se ajusten a los requerimientos.
export const chatResponses = [
  "Entendido, ¿en qué más puedo ayudarte?",
  "Esa es una excelente pregunta. Déjame explicarte...",
  "Claro, con gusto te ayudo con eso.",
  "¿Podrías darme más detalles sobre tu consulta?",
  "Perfecto, he registrado esa información.",
  "Comprendo tu situación. Te sugiero lo siguiente...",
  "Gracias por tu consulta. Basándome en lo que me comentas...",
  "Excelente, vamos a resolver esto paso a paso.",
  "Entiendo perfectamente. La mejor opción sería...",
  "Tienes razón, es importante considerar ese aspecto.",
];

export const getRandomResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * chatResponses.length);
  return chatResponses[randomIndex];
};
