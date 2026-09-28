# ¿Quién soy? — Edición Bíblica

Juego de preguntas en el que, a partir de una pista, hay que adivinar qué personaje bíblico dejó esa huella. Cada pregunta tiene 4 opciones y solo una es correcta.

**Desarrollado por Joseph Moya · ASO JOVENES**

## Modos de juego

- **Individual:** una sola persona responde todas las preguntas y al final ve su puntaje y porcentaje.
- **Por equipos (2 a 4):** los equipos se turnan una pregunta cada uno. La cantidad de preguntas se ajusta para que todos respondan la misma cantidad. Al final se muestra el ranking y el equipo ganador (o el empate).

En ambos modos, después de cada respuesta se muestra la cita bíblica y, al terminar, se pueden repasar las preguntas falladas.

## Requisitos

- Node.js 18 o superior

## Uso

```bash
npm install
npm run dev       # servidor de desarrollo
npm run build     # compila para producción en /dist
npm run preview   # sirve la versión compilada
npm run lint      # revisa el código
```

## Estructura

```
src/
├── assets/                 # imágenes (aquí va el logo)
├── config/brand.js         # nombre, organización, desarrollador y logo
├── data/
│   ├── questions.js        # banco de preguntas
│   └── extraOptions.js     # opciones incorrectas adicionales
├── components/             # componentes reutilizables (Layout, Header, Footer, Logo, Button, ChoiceGroup)
├── features/
│   ├── setup/              # formulario de configuración (modo, equipos, cantidad)
│   ├── game/               # lógica (useGame + reducer), utilidades y componentes de la partida
│   └── results/            # puntaje, ranking y repaso de preguntas falladas
├── pages/                  # StartScreen, GameScreen, ResultScreen
├── styles/                 # variables, reset y estilos globales
├── App.jsx
└── main.jsx
```

## Agregar el logo

1. Guarda la imagen en `src/assets/` (por ejemplo `logo.png` o `logo.svg`).
2. En `src/config/brand.js`, descomenta `import logo from '../assets/logo.png';` y cambia `logo: null` por `logo`.

Mientras no haya logo, el encabezado muestra un emblema provisional. Si quieres, también puedes reemplazar `public/favicon.svg`.

## Agregar o editar preguntas

Edita `src/data/questions.js`. Cada pregunta tiene esta forma:

```js
{
  id: 36,                    // único
  clue: 'Texto de la pista... ¿Quién soy?',
  answer: 'Nombre',
  reference: 'Libro 1:1',
  kind: 'individual',        // o 'grupo' para "¿Quiénes somos?"
}
```

Las opciones incorrectas se toman automáticamente de las respuestas de otras preguntas del mismo `kind` y de `extraOptions.js`.
