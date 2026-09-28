import styles from './TurnIndicator.module.css';

export function TurnIndicator({ teamName }) {
  return (
    <p className={styles.turn} aria-live="polite">
      Turno de <strong className={styles.team}>{teamName}</strong>
    </p>
  );
}
