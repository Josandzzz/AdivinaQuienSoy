import { SCREENS } from '../constants';

/**
 * Guarda la partida en curso en localStorage para que sobreviva a una recarga.
 * La versión en la clave permite descartar partidas guardadas si cambia la forma del estado.
 */
const STORAGE_KEY = 'quien-soy:partida:v1';

const SAVED_SCREENS = [SCREENS.PLAYING, SCREENS.RESULTS];

/** Comprueba que lo leído tenga la forma mínima de una partida válida. */
function isValidGame(state) {
  return (
    state !== null &&
    typeof state === 'object' &&
    SAVED_SCREENS.includes(state.screen) &&
    Array.isArray(state.players) &&
    state.players.length > 0 &&
    Array.isArray(state.questions) &&
    state.questions.length > 0 &&
    Number.isInteger(state.currentIndex) &&
    state.currentIndex < state.questions.length &&
    Number.isInteger(state.turn) &&
    state.turn < state.players.length &&
    Array.isArray(state.history)
  );
}

/** Devuelve la partida guardada o `null` si no hay una válida. */
export function loadGame() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return isValidGame(saved) ? saved : null;
  } catch {
    // JSON dañado o almacenamiento bloqueado (modo privado, permisos del navegador).
    return null;
  }
}

/** Guarda la partida si está en juego o en resultados; si no, la elimina. */
export function saveGame(state) {
  try {
    if (SAVED_SCREENS.includes(state.screen)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Si no se puede guardar (almacenamiento lleno o bloqueado) el juego sigue funcionando igual.
  }
}
