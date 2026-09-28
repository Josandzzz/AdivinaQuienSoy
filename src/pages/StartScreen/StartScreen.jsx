import { BRAND } from '../../config/brand';
import { GameSetupForm } from '../../features/setup/components/GameSetupForm/GameSetupForm';
import styles from './StartScreen.module.css';

export function StartScreen({ onStart }) {
  return (
    <section className={styles.screen} aria-labelledby="start-title">
      <header className={styles.intro}>
        <h2 id="start-title" className={styles.title}>
          {BRAND.tagline}
        </h2>
        <p className={styles.text}>
          Lee la pista, piensa en quién dejó esa huella y elige la respuesta correcta. Solo una
          opción es verdadera.
        </p>
      </header>
      <GameSetupForm onStart={onStart} />
    </section>
  );
}
