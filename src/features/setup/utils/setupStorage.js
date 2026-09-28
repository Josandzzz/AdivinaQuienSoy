import { QUESTIONS } from '../../../data/questions';
import { readJSON, writeJSON } from '../../../utils/storage';
import { GAME_MODES, MAX_TEAMS, MIN_TEAMS, ROUND_SIZES } from '../../game/constants';

/** Recuerda la última configuración usada para no tener que escribirla de nuevo. */
const STORAGE_KEY = 'quien-soy:configuracion:v1';

export const TEAM_NAME_MAX_LENGTH = 24;

export const ROUND_SIZE_CHOICES = [...ROUND_SIZES, QUESTIONS.length];

export const defaultTeamNames = () =>
  Array.from({ length: MIN_TEAMS }, (_, i) => `Equipo ${i + 1}`);

export const DEFAULT_SETUP = {
  mode: GAME_MODES.INDIVIDUAL,
  roundSize: ROUND_SIZES[0],
  teamNames: defaultTeamNames(),
};

function isValidTeamNames(names) {
  return (
    Array.isArray(names) &&
    names.length >= MIN_TEAMS &&
    names.length <= MAX_TEAMS &&
    names.every((name) => typeof name === 'string')
  );
}

/**
 * Devuelve la configuración guardada. Cada campo se valida por separado:
 * si uno no es válido se usa su valor por defecto sin descartar los demás.
 */
export function loadSetup() {
  const saved = readJSON(STORAGE_KEY);
  if (saved === null || typeof saved !== 'object') return DEFAULT_SETUP;

  return {
    mode: Object.values(GAME_MODES).includes(saved.mode) ? saved.mode : DEFAULT_SETUP.mode,
    roundSize: ROUND_SIZE_CHOICES.includes(saved.roundSize)
      ? saved.roundSize
      : DEFAULT_SETUP.roundSize,
    teamNames: isValidTeamNames(saved.teamNames)
      ? saved.teamNames.map((name) => name.slice(0, TEAM_NAME_MAX_LENGTH))
      : DEFAULT_SETUP.teamNames,
  };
}

export function saveSetup(setup) {
  writeJSON(STORAGE_KEY, setup);
}
