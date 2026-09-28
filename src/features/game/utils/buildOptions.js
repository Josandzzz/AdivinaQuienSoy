import { OPTIONS_PER_QUESTION } from '../constants';
import { shuffle } from './shuffle';

/**
 * Arma las opciones de una pregunta: la respuesta correcta más distractores
 * del mismo tipo (individual o grupo), todo en orden aleatorio.
 */
export function buildOptions(question, allQuestions, extraOptions = {}) {
  const pool = new Set([
    ...allQuestions.filter((q) => q.kind === question.kind).map((q) => q.answer),
    ...(extraOptions[question.kind] ?? []),
  ]);
  pool.delete(question.answer);

  const distractors = shuffle([...pool]).slice(0, OPTIONS_PER_QUESTION - 1);
  return shuffle([question.answer, ...distractors]);
}
