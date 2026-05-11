import React from 'react';
import { getPasswordStrength } from '../utils/validators';
import styles from './PasswordStrength.module.css';

/**
 * PasswordStrength
 * Renders 4 segmented bars + a label showing password strength.
 *
 * Props:
 *   password {string} - the current password value
 */
function PasswordStrength({ password }) {
  if (!password || password.length < 6) return null;

  const score = getPasswordStrength(password); // 1–4

  // Map score → display config
  const config = {
    1: { label: 'Weak',   color: 'var(--err)',  level: 'weak'   },
    2: { label: 'Fair',   color: 'var(--warn)', level: 'medium' },
    3: { label: 'Good',   color: 'var(--warn)', level: 'medium' },
    4: { label: 'Strong', color: 'var(--ok)',   level: 'strong' },
  };

  const { label, color, level } = config[score] || config[1];

  return (
    <div className={styles.wrapper} aria-label={`Password strength: ${label}`}>
      {/* 4 segmented bars */}
      <div className={styles.bars}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={[styles.bar, i < score ? styles[level] : ''].join(' ')}
          />
        ))}
      </div>

      {/* Strength label */}
      <span className={styles.label} style={{ color }}>
        {label}
      </span>
    </div>
  );
}

export default PasswordStrength;