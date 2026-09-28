import { useEffect, useId, useRef } from 'react';
import { Button } from '../Button/Button';
import styles from './ConfirmDialog.module.css';

/**
 * Diálogo modal de confirmación basado en <dialog>.
 * Se usa en lugar de window.confirm(), que algunos navegadores integrados bloquean.
 */
export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Aceptar',
  cancelLabel = 'Cancelar',
  onConfirm,
  onCancel,
}) {
  const dialogRef = useRef(null);
  const titleId = useId();
  const messageId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  // Clic fuera del contenido (en el fondo) cierra el diálogo.
  const handleBackdropClick = (event) => {
    if (event.target === dialogRef.current) onCancel();
  };

  return (
    <dialog
      ref={dialogRef}
      className={styles.dialog}
      aria-labelledby={titleId}
      aria-describedby={messageId}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      onClick={handleBackdropClick}
    >
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <p id={messageId} className={styles.message}>
        {message}
      </p>
      <footer className={styles.actions}>
        <Button variant="secondary" onClick={onCancel} autoFocus>
          {cancelLabel}
        </Button>
        <Button onClick={onConfirm}>{confirmLabel}</Button>
      </footer>
    </dialog>
  );
}
