import { OptionButton } from '../OptionButton/OptionButton';
import styles from './OptionList.module.css';

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

function getStatus(option, { answer, selected }) {
  if (selected === null) return 'idle';
  if (option === answer) return 'correct';
  if (option === selected) return 'wrong';
  return 'dimmed';
}

export function OptionList({ options, answer, selected, onSelect }) {
  const isAnswered = selected !== null;

  return (
    <ul role="list" className={styles.list} aria-label="Opciones">
      {options.map((option, index) => (
        <li key={option}>
          <OptionButton
            letter={LETTERS[index]}
            label={option}
            status={getStatus(option, { answer, selected })}
            disabled={isAnswered}
            onSelect={() => onSelect(option)}
          />
        </li>
      ))}
    </ul>
  );
}
