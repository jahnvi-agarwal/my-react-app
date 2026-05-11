import React from 'react';
import styles from './Toast.module.css';

/**
 * Toast
 * Fixed notification that slides in from the top.
 *
 * Props:
 *   message {string}  - text to display
 *   visible {boolean} - controls show/hide animation
 */
function Toast({ message, visible }) {
  return (
    <div
      className={[styles.toast, visible ? styles.show : ''].join(' ')}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={styles.dot} />
      <span>{message}</span>
    </div>
  );
}

export default Toast;