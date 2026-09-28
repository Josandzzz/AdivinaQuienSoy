import styles from './MissedQuestions.module.css';

/** Lista para repasar las preguntas falladas, con su respuesta y cita. */
export function MissedQuestions({ history, players, isTeamMode }) {
  const missed = history.filter((entry) => !entry.isCorrect);

  if (missed.length === 0) {
    return <p className={styles.perfect}>¡No fallaste ninguna pregunta! 🎉</p>;
  }

  const playerNames = Object.fromEntries(players.map((p) => [p.id, p.name]));

  return (
    <details className={styles.details}>
      <summary className={styles.summary}>Repasa las preguntas falladas ({missed.length})</summary>
      <ol className={styles.list}>
        {missed.map(({ question, selected, playerId }) => (
          <li key={question.id} className={styles.item}>
            <p className={styles.clue}>{question.clue}</p>
            <dl className={styles.meta}>
              {isTeamMode && (
                <>
                  <dt>Equipo</dt>
                  <dd>{playerNames[playerId]}</dd>
                </>
              )}
              <dt>Elegida</dt>
              <dd className={styles.wrong}>{selected}</dd>
              <dt>Correcta</dt>
              <dd className={styles.right}>{question.answer}</dd>
              <dt>Referencia</dt>
              <dd>
                <cite>{question.reference}</cite>
              </dd>
            </dl>
          </li>
        ))}
      </ol>
    </details>
  );
}
