import styles from './Button.module.css';

/** Botón reutilizable. Variantes: 'primary' | 'secondary' | 'ghost'. */
export function Button({ variant = 'primary', type = 'button', className = '', ref, ...props }) {
  return (
    <button
      ref={ref}
      type={type}
      className={`${styles.button} ${styles[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
