import { useEffect, useRef } from 'react';
import styles from './QuestionCard.module.css';

/** Tarjeta de la pregunta. Mueve el foco al título cuando cambia la pregunta. */
export function QuestionCard({ number, question, children }) {
  const headingRef = useRef(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [question.id]);

  return (
    <article className={styles.card} aria-labelledby={`question-${question.id}`}>
      <h2 id={`question-${question.id}`} ref={headingRef} tabIndex={-1} className={styles.title}>
        Pregunta {number}
      </h2>
      <blockquote className={styles.clue}>
        <p>{question.clue}</p>
      </blockquote>
      {children}
    </article>
  );
}
