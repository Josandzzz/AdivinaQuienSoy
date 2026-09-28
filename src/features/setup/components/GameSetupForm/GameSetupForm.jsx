import { useState } from 'react';
import { Button } from '../../../../components/Button/Button';
import { ChoiceGroup } from '../../../../components/ChoiceGroup/ChoiceGroup';
import { QUESTIONS } from '../../../../data/questions';
import { GAME_MODES } from '../../../game/constants';
import { getRoundLength } from '../../../game/utils/buildRound';
import { loadSetup, ROUND_SIZE_CHOICES, saveSetup } from '../../utils/setupStorage';
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

const SIZE_OPTIONS = ROUND_SIZE_CHOICES.map((size) => ({
  value: size,
  label: size === QUESTIONS.length ? `Todas (${size})` : String(size),
}));

/** Limpia los nombres y usa uno por defecto si quedó vacío. */
const normalizeTeamNames = (names) =>
  names.map((name, i) => name.trim() || `Equipo ${i + 1}`);

export function GameSetupForm({ onStart }) {
  // La configuración de la última partida se usa como punto de partida.
  const [savedSetup] = useState(loadSetup);
  const [mode, setMode] = useState(savedSetup.mode);
  const [roundSize, setRoundSize] = useState(savedSetup.roundSize);
  const [teamNames, setTeamNames] = useState(savedSetup.teamNames);

  const isTeamMode = mode === GAME_MODES.TEAMS;
  const playersCount = isTeamMode ? teamNames.length : 1;
  const roundLength = getRoundLength({
    questionsCount: QUESTIONS.length,
    size: roundSize,
    playersCount,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const cleanTeamNames = normalizeTeamNames(teamNames);
    // Los nombres de equipos se recuerdan aunque se juegue en modo individual.
    saveSetup({ mode, roundSize, teamNames: cleanTeamNames });
    onStart({
      mode,
      roundSize,
      teamNames: isTeamMode ? cleanTeamNames : [],
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
