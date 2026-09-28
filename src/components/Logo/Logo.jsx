import { BRAND } from '../../config/brand';
import styles from './Logo.module.css';

/**
 * Muestra el logo de la organización si está configurado en `config/brand.js`;
 * si no, un emblema provisional (libro abierto).
 */
export function Logo() {
  if (BRAND.logo) {
    return <img className={styles.logo} src={BRAND.logo} alt={`Logo de ${BRAND.organization}`} />;
  }

  return (
    <svg className={styles.logo} viewBox="0 0 64 64" aria-hidden="true" focusable="false">
      <rect width="64" height="64" rx="14" className={styles.badge} />
      <path
        d="M12 18c8-3 14-2 20 3 6-5 12-6 20-3v30c-8-3-14-2-20 3-6-5-12-6-20-3z"
        className={styles.book}
      />
      <path d="M32 21v30" className={styles.spine} />
    </svg>
  );
}
