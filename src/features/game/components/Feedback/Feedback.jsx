import { useEffect, useRef } from 'react';
import { Button } from '../../../../components/Button/Button';
import styles from './Feedback.module.css';

function getMessage({ isCorrect, answer, teamName }) {
  if (isCorrect) return teamName ? `¡Correcto! Punto para ${teamName}.` : '¡Correcto!';
  return `Incorrecto. La respuesta era ${answer}.`;
}

/**
 * Resultado de la respuesta, la cita bíblica y el botón para continuar.
 * La región `role="status"` existe siempre para que los lectores de pantalla anuncien el cambio.
 */
export function Feedback({ isAnswered, isCorrect, question, teamName, isLastQuestion, onNext }) {
  const nextRef = useRef(null);

  useEffect(() => {
    if (isAnswered) nextRef.current?.focus();
  }, [isAnswered]);

  const tone = isCorrect ? styles.success : styles.error;

  return (
    <footer className={styles.feedback}>
      <p role="status" className={`${styles.message} ${isAnswered ? tone : ''}`}>
        {isAnswered && getMessage({ isCorrect, answer: question.answer, teamName })}
      </p>

      {isAnswered && (
        <>
          <p className={styles.reference}>
            📖 Lee más en <cite>{question.reference}</cite>
          </p>
          <Button ref={nextRef} onClick={onNext} className={styles.next}>
            {isLastQuestion ? 'Ver resultados' : 'Siguiente pregunta'}
          </Button>
        </>
      )}
    </footer>
  );
}
