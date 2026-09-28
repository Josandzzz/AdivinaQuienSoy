import { BRAND } from '../../config/brand';
import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        <strong>{BRAND.organization}</strong>
      </p>
      <p>
        <small>© {new Date().getFullYear()}</small>
      </p>
    </footer>
  );
}
