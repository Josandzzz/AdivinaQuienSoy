import { Footer } from '../Footer/Footer';
import { Header } from '../Header/Header';
import styles from './Layout.module.css';

export function Layout({ children }) {
  return (
    <>
      <a className={styles.skipLink} href="#contenido">
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" className={styles.main}>
        {children}
      </main>
      <Footer />
    </>
  );
}
