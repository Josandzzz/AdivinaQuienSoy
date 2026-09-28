import styles from './OptionButton.module.css';

const STATUS_LABELS = {
  correct: 'respuesta correcta',
  wrong: 'tu respuesta, incorrecta',
};

/** `status`: 'idle' | 'correct' | 'wrong' | 'dimmed' */
export function OptionButton({ letter, label, status, disabled, onSelect }) {
  const statusLabel = STATUS_LABELS[status];

  return (
    <button
      type="button"
      className={`${styles.option} ${styles[status] ?? ''}`}
      disabled={disabled}
      onClick={onSelect}
    >
      <span className={styles.letter} aria-hidden="true">
        {letter}
      </span>
      <span className={styles.label}>{label}</span>
      {statusLabel && <span className="visually-hidden">({statusLabel})</span>}
    </button>
  );
}
