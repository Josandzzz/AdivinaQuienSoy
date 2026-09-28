import { getRanking, getWinnerMessage } from '../../utils/results';
import styles from './TeamRanking.module.css';

export function TeamRanking({ players, questionsPerTeam }) {
  const { ranking, winners } = getRanking(players);
  const winnerIds = new Set(winners.map((w) => w.id));

  return (
    <section className={styles.ranking} aria-labelledby="ranking-title">
      <h3 id="ranking-title" className={styles.winner}>
        🏆 {getWinnerMessage(winners)}
      </h3>
      <ol role="list" className={styles.list}>
        {ranking.map((team) => (
          <li
            key={team.id}
            className={`${styles.item} ${winnerIds.has(team.id) ? styles.first : ''}`}
          >
            <span className={styles.position} aria-hidden="true">
              {team.position}
            </span>
            <span className={styles.name}>{team.name}</span>
            <span className={styles.score}>
              {team.score} / {questionsPerTeam}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
