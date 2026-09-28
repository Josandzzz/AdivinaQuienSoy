import { useId } from 'react';
import { Button } from '../../../../components/Button/Button';
import { MAX_TEAMS, MIN_TEAMS } from '../../../game/constants';
import { TEAM_NAME_MAX_LENGTH } from '../../utils/setupStorage';
import styles from './TeamNamesFieldset.module.css';

export function TeamNamesFieldset({ teamNames, onChange }) {
  const id = useId();

  const updateName = (index, name) =>
    onChange(teamNames.map((current, i) => (i === index ? name : current)));

  const addTeam = () => onChange([...teamNames, `Equipo ${teamNames.length + 1}`]);

  const removeTeam = (index) => onChange(teamNames.filter((_, i) => i !== index));

  return (
    <fieldset className={styles.fieldset}>
      <legend className={styles.legend}>Equipos</legend>
      <p className={styles.hint}>
        Entre {MIN_TEAMS} y {MAX_TEAMS} equipos. Se turnan una pregunta cada uno.
      </p>

      <ol role="list" className={styles.list}>
        {teamNames.map((name, index) => {
          const inputId = `${id}-team-${index}`;
          return (
            <li key={index} className={styles.item}>
              <label htmlFor={inputId} className="visually-hidden">
                Nombre del equipo {index + 1}
              </label>
              <span className={styles.number} aria-hidden="true">
                {index + 1}
              </span>
              <input
                id={inputId}
                className={styles.input}
                type="text"
                value={name}
                maxLength={TEAM_NAME_MAX_LENGTH}
                placeholder={`Equipo ${index + 1}`}
                onChange={(event) => updateName(index, event.target.value)}
              />
              {teamNames.length > MIN_TEAMS && (
                <Button
                  variant="ghost"
                  onClick={() => removeTeam(index)}
                  aria-label={`Quitar ${name || `equipo ${index + 1}`}`}
                >
                  ✕
                </Button>
              )}
            </li>
          );
        })}
      </ol>

      {teamNames.length < MAX_TEAMS && (
        <Button variant="secondary" onClick={addTeam}>
          + Agregar equipo
        </Button>
      )}
    </fieldset>
  );
}
