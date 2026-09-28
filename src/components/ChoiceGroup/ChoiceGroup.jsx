import { useId } from 'react';
import styles from './ChoiceGroup.module.css';

/**
 * Grupo de opciones tipo radio presentadas como tarjetas.
 * `options`: [{ value, label, description? }]
 */
export function ChoiceGroup({ legend, name, options, value, onChange, minItemWidth = '220px' }) {
  const id = useId();

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>{legend}</legend>
      <ul role="list" className={styles.list} style={{ '--min-item-width': minItemWidth }}>
        {options.map((option) => {
          const inputId = `${id}-${option.value}`;
          return (
            <li key={option.value}>
              <input
                className={`${styles.input} visually-hidden`}
                type="radio"
                id={inputId}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
              />
              <label className={styles.card} htmlFor={inputId}>
                <strong className={styles.label}>{option.label}</strong>
                {option.description && (
                  <span className={styles.description}>{option.description}</span>
                )}
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
