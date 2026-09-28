import { EXTRA_OPTIONS } from '../../../data/extraOptions';
import { buildOptions } from './buildOptions';
import { shuffle } from './shuffle';

/**
 * Cantidad real de preguntas de la partida.
 * En modo equipos se ajusta a un múltiplo del número de equipos
 * para que todos respondan la misma cantidad de preguntas.
 */
export function getRoundLength({ questionsCount, size, playersCount = 1 }) {
  const available = Math.min(size, questionsCount);
  return Math.floor(available / playersCount) * playersCount;
}

/** Elige las preguntas de la partida y les asigna sus opciones. */
export function buildRound({ questions, size, playersCount = 1 }) {
  const total = getRoundLength({ questionsCount: questions.length, size, playersCount });

  return shuffle(questions)
    .slice(0, total)
    .map((question) => ({
      ...question,
      options: buildOptions(question, questions, EXTRA_OPTIONS),
    }));
}
