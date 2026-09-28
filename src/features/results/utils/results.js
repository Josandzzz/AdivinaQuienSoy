export function getPercentage(score, total) {
  return total === 0 ? 0 : Math.round((score / total) * 100);
}

export function getResultMessage(percentage) {
  if (percentage >= 90) return '¡Excelente! Conoces muy bien las huellas de estos personajes.';
  if (percentage >= 70) return '¡Muy bien! Vas por buen camino.';
  if (percentage >= 40) return '¡Buen intento! Sigue escudriñando las Escrituras.';
  return '¡No te rindas! Cada lectura deja una nueva huella.';
}

/**
 * Ordena los equipos por puntaje y devuelve los ganadores (puede haber empate).
 * Los equipos empatados comparten la misma posición.
 */
export function getRanking(players) {
  const sorted = [...players].sort((a, b) => b.score - a.score);
  const ranking = sorted.map((player) => ({
    ...player,
    position: sorted.findIndex((p) => p.score === player.score) + 1,
  }));
  const topScore = ranking[0]?.score ?? 0;
  const winners = ranking.filter((p) => p.score === topScore);
  return { ranking, winners };
}

const listFormatter = new Intl.ListFormat('es', { style: 'long', type: 'conjunction' });

export function getWinnerMessage(winners) {
  if (winners.length === 1) return `¡Ganó ${winners[0].name}!`;
  return `¡Empate entre ${listFormatter.format(winners.map((w) => w.name))}!`;
}
