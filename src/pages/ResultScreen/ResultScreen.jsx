import { useEffect, useRef } from 'react';
import { Button } from '../../components/Button/Button';
import { MissedQuestions } from '../../features/results/components/MissedQuestions/MissedQuestions';
import { ScoreSummary } from '../../features/results/components/ScoreSummary/ScoreSummary';
import { TeamRanking } from '../../features/results/components/TeamRanking/TeamRanking';
import styles from './ResultScreen.module.css';

export function ResultScreen({ game }) {
  const { players, history, totalQuestions, isTeamMode, playAgain, reset } = game;
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  return (
    <section className={styles.screen} aria-labelledby="results-title">
      <h2 id="results-title" ref={headingRef} tabIndex={-1} className={styles.title}>
        Resultados
      </h2>

      {isTeamMode ? (
        <TeamRanking players={players} questionsPerTeam={totalQuestions / players.length} />
      ) : (
        <ScoreSummary score={players[0].score} total={totalQuestions} />
      )}

      <MissedQuestions history={history} players={players} isTeamMode={isTeamMode} />

      <footer className={styles.actions}>
        <Button onClick={playAgain}>Jugar de nuevo</Button>
        <Button variant="secondary" onClick={reset}>
          Cambiar configuración
        </Button>
      </footer>
    </section>
  );
}
