import { BRAND } from '../../config/brand';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        Desarrollado por <strong>{BRAND.developer}</strong> · {BRAND.organization}
      </p>
      <p>
        <small>© {new Date().getFullYear()}</small>
      </p>
    </footer>
  );
}
