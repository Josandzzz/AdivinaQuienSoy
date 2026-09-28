import { useId } from 'react';
import styles from './ProgressBar.module.css';

export function ProgressBar({ current, total }) {
  const id = useId();

  return (
    <p className={styles.wrapper}>
      <label htmlFor={id} className={styles.label}>
        Pregunta {current} de {total}
      </label>
      <progress id={id} className={styles.progress} max={total} value={current} />
    </p>
  );
}
