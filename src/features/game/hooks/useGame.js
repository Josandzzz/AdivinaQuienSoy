import { useCallback, useMemo, useReducer } from 'react';
import { GAME_MODES } from '../constants';
import { ACTIONS, gameReducer, initialState } from './gameReducer';

/** Expone el estado del juego, valores derivados y acciones. */
export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  const start = useCallback((config) => dispatch({ type: ACTIONS.START, config }), []);
  const answer = useCallback((option) => dispatch({ type: ACTIONS.ANSWER, option }), []);
  const next = useCallback(() => dispatch({ type: ACTIONS.NEXT }), []);
  const playAgain = useCallback(() => dispatch({ type: ACTIONS.PLAY_AGAIN }), []);
  const reset = useCallback(() => dispatch({ type: ACTIONS.RESET }), []);

  const derived = useMemo(() => {
    const currentQuestion = state.questions[state.currentIndex] ?? null;
    const isAnswered = state.selected !== null;
    return {
      currentQuestion,
      currentPlayer: state.players[state.turn] ?? null,
      isTeamMode: state.config?.mode === GAME_MODES.TEAMS,
      isAnswered,
      isCorrect: isAnswered && state.selected === currentQuestion?.answer,
      isLastQuestion: state.currentIndex === state.questions.length - 1,
      totalQuestions: state.questions.length,
    };
  }, [state]);

  return { ...state, ...derived, start, answer, next, playAgain, reset };
}
