import { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { ConfirmDialog } from '../../components/ConfirmDialog/ConfirmDialog';
import { Feedback } from '../../features/game/components/Feedback/Feedback';
import { OptionList } from '../../features/game/components/OptionList/OptionList';
import { ProgressBar } from '../../features/game/components/ProgressBar/ProgressBar';
import { QuestionCard } from '../../features/game/components/QuestionCard/QuestionCard';
import { ScoreBoard } from '../../features/game/components/ScoreBoard/ScoreBoard';
import { TurnIndicator } from '../../features/game/components/TurnIndicator/TurnIndicator';
import styles from './GameScreen.module.css';

export function GameScreen({ game }) {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    players,
    currentPlayer,
    isTeamMode,
    selected,
    isAnswered,
    isCorrect,
    isLastQuestion,
    answer,
    next,
    reset,
  } = game;

  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  return (
    <section className={styles.screen} aria-label="Partida en curso">
      <header className={styles.status}>
        <ProgressBar current={currentIndex + 1} total={totalQuestions} />
        <ScoreBoard
          players={players}
          currentPlayerId={currentPlayer.id}
          isTeamMode={isTeamMode}
        />
      </header>

      {isTeamMode && <TurnIndicator teamName={currentPlayer.name} />}

      <QuestionCard number={currentIndex + 1} question={currentQuestion}>
        <OptionList
          options={currentQuestion.options}
          answer={currentQuestion.answer}
          selected={selected}
          onSelect={answer}
        />
        <Feedback
          isAnswered={isAnswered}
          isCorrect={isCorrect}
          question={currentQuestion}
          teamName={isTeamMode ? currentPlayer.name : null}
          isLastQuestion={isLastQuestion}
          onNext={next}
        />
      </QuestionCard>

      <Button variant="ghost" className={styles.exit} onClick={() => setIsExitDialogOpen(true)}>
        Salir de la partida
      </Button>

      <ConfirmDialog
        open={isExitDialogOpen}
        title="¿Salir de la partida?"
        message="Se perderá el progreso y los puntajes de esta partida."
        confirmLabel="Sí, salir"
        cancelLabel="Seguir jugando"
        onConfirm={reset}
        onCancel={() => setIsExitDialogOpen(false)}
      />
    </section>
  );
}
