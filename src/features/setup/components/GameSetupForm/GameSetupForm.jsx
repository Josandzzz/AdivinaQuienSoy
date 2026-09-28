import { useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { ChoiceGroup } from '../../../../components/ChoiceGroup/ChoiceGroup';
import { QUESTIONS } from '../../../../data/questions';
import { GAME_MODES, MIN_TEAMS, ROUND_SIZES } from '../../../game/constants';
import { getRoundLength } from '../../../game/utils/buildRound';
import { TeamNamesFieldset } from '../TeamNamesFieldset/TeamNamesFieldset';
import styles from './GameSetupForm.module.css';

const MODE_OPTIONS = [
  {
    value: GAME_MODES.INDIVIDUAL,
    label: 'Individual',
    description: 'Juega a tu ritmo y pon a prueba lo que sabes.',
  },
  {
    value: GAME_MODES.TEAMS,
    label: 'Por equipos',
    description: 'Los equipos se turnan y compiten por más puntos.',
  },
];

const SIZE_OPTIONS = [
  ...ROUND_SIZES.map((size) => ({ value: size, label: String(size) })),
  { value: QUESTIONS.length, label: `Todas (${QUESTIONS.length})` },
];

const defaultTeamNames = () =>
  Array.from({ length: MIN_TEAMS }, (_, i) => `Equipo ${i + 1}`);

/** Limpia los nombres y usa uno por defecto si quedó vacío. */
const normalizeTeamNames = (names) =>
  names.map((name, i) => name.trim() || `Equipo ${i + 1}`);

export function GameSetupForm({ onStart }) {
  const [mode, setMode] = useState(GAME_MODES.INDIVIDUAL);
  const [roundSize, setRoundSize] = useState(ROUND_SIZES[0]);
  const [teamNames, setTeamNames] = useState(defaultTeamNames);

  const isTeamMode = mode === GAME_MODES.TEAMS;
  const playersCount = isTeamMode ? teamNames.length : 1;
  const roundLength = getRoundLength({
    questionsCount: QUESTIONS.length,
    size: roundSize,
    playersCount,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    onStart({
      mode,
      roundSize,
      teamNames: isTeamMode ? normalizeTeamNames(teamNames) : [],
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <ChoiceGroup
        legend="Modo de juego"
        name="mode"
        options={MODE_OPTIONS}
        value={mode}
        onChange={setMode}
      />

      {isTeamMode && <TeamNamesFieldset teamNames={teamNames} onChange={setTeamNames} />}

      <ChoiceGroup
        legend="Cantidad de preguntas"
        name="roundSize"
        options={SIZE_OPTIONS}
        value={roundSize}
        onChange={setRoundSize}
        minItemWidth="95px"
      />

      <p className={styles.summary} aria-live="polite">
        {isTeamMode
          ? `${roundLength} preguntas en total: ${roundLength / playersCount} para cada equipo.`
          : `Responderás ${roundLength} preguntas.`}
      </p>

      <Button type="submit" className={styles.submit}>
        Comenzar
      </Button>
    </form>
  );
}
