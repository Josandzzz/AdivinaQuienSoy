/**
 * Opciones incorrectas adicionales por tipo de pregunta.
 * Solo hay 3 preguntas de tipo 'grupo', así que se complementan
 * con otros grupos bíblicos para que las opciones no se repitan siempre.
 */
export const EXTRA_OPTIONS = {
  individual: ['Abraham', 'Elías', 'Gedeón', 'Samuel', 'Noemí', 'Nicodemo'],
  grupo: [
    'Marta y María',
    'Adán y Eva',
    'Abraham y Sara',
    'Zacarías y Elisabet',
    'Ananías y Safira',
    'Noemí y Orfa',
    'Pedro, Jacobo y Juan',
  ],
};
