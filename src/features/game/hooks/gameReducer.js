import { QUESTIONS } from '../../../data/questions';
import { GAME_MODES, SCREENS } from '../constants';
import { buildRound } from '../utils/buildRound';

export const ACTIONS = {
  START: 'start',
  ANSWER: 'answer',
  NEXT: 'next',
  PLAY_AGAIN: 'playAgain',
  RESET: 'reset',
};

export const initialState = {
  screen: SCREENS.START,
  config: null,
  players: [],
  turn: 0,
  questions: [],
  currentIndex: 0,
  selected: null,
  history: [],
};

function createPlayers({ mode, teamNames }) {
  if (mode === GAME_MODES.TEAMS) {
    return teamNames.map((name, index) => ({ id: `team-${index + 1}`, name, score: 0 }));
  }
  return [{ id: 'player', name: 'Jugador', score: 0 }];
}

function startGame(config) {
  const players = createPlayers(config);
  return {
    ...initialState,
    screen: SCREENS.PLAYING,
    config,
    players,
    questions: buildRound({
      questions: QUESTIONS,
      size: config.roundSize,
      playersCount: players.length,
    }),
  };
}

function answer(state, option) {
  if (state.selected !== null) return state;

  const question = state.questions[state.currentIndex];
  const isCorrect = option === question.answer;
  const player = state.players[state.turn];

  return {
    ...state,
    selected: option,
    players: state.players.map((p) =>
      p.id === player.id && isCorrect ? { ...p, score: p.score + 1 } : p,
    ),
    history: [...state.history, { question, playerId: player.id, selected: option, isCorrect }],
  };
}

function next(state) {
  if (state.selected === null) return state;

  const nextIndex = state.currentIndex + 1;
  if (nextIndex >= state.questions.length) {
    return { ...state, screen: SCREENS.RESULTS };
  }

  return {
    ...state,
    currentIndex: nextIndex,
    selected: null,
    turn: (state.turn + 1) % state.players.length,
  };
}

export function gameReducer(state, action) {
  switch (action.type) {
    case ACTIONS.START:
      return startGame(action.config);
    case ACTIONS.ANSWER:
      return answer(state, action.option);
    case ACTIONS.NEXT:
      return next(state);
    case ACTIONS.PLAY_AGAIN:
      return startGame(state.config);
    case ACTIONS.RESET:
      return initialState;
    default:
      return state;
  }
}
