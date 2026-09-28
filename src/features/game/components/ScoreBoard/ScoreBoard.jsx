import styles from './ScoreBoard.module.css';

/** Marcador: un puntaje en modo individual, o la lista de equipos con el turno actual. */
export function ScoreBoard({ players, currentPlayerId, isTeamMode }) {
  if (!isTeamMode) {
    return (
      <p className={styles.single}>
        Puntos: <output className={styles.score}>{players[0].score}</output>
      </p>
    );
  }

  return (
    <section aria-label="Marcador de equipos">
      <ol role="list" className={styles.teams}>
        {players.map((team) => {
          const isCurrent = team.id === currentPlayerId;
          return (
            <li
              key={team.id}
              className={`${styles.team} ${isCurrent ? styles.current : ''}`}
              aria-current={isCurrent ? 'true' : undefined}
            >
              <span className={styles.name}>{team.name}</span>
              <output className={styles.score}>{team.score}</output>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
