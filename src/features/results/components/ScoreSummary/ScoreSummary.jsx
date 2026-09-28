import { getPercentage, getResultMessage } from '../../utils/results';
import styles from './ScoreSummary.module.css';

export function ScoreSummary({ score, total }) {
  const percentage = getPercentage(score, total);

  return (
    <section className={styles.summary} aria-label="Tu puntaje">
      <p className={styles.score}>
        <data value={score}>{score}</data>
        <span className={styles.total}> / {total}</span>
      </p>
      <p className={styles.percentage}>{percentage}% de aciertos</p>
      <p className={styles.message}>{getResultMessage(percentage)}</p>
    </section>
  );
}
