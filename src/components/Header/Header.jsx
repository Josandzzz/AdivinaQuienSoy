import { BRAND } from '../../config/brand';
import { Logo } from '../Logo/Logo';
import styles from './Header.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <Logo />
      <hgroup>
        <h1 className={styles.title}>{BRAND.appName}</h1>
        <p className={styles.subtitle}>
          {BRAND.edition} · {BRAND.organization}
        </p>
      </hgroup>
    </header>
  );
}
