/**
 * Acceso seguro a localStorage.
 * Si el almacenamiento está bloqueado (modo privado, permisos del navegador), lleno
 * o tiene datos dañados, estas funciones fallan en silencio y la app sigue funcionando.
 */

/** Lee y parsea un valor JSON; devuelve `null` si no existe o no se puede leer. */
export function readJSON(key) {
  try {
    return JSON.parse(localStorage.getItem(key));
  } catch {
    return null;
  }
}

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // No se pudo guardar; se ignora.
  }
}

export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch {
    // No se pudo borrar; se ignora.
  }
}
