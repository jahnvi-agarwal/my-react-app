import React from 'react';
import { getPasswordStrength } from '../utils/validators';
import styles from './PasswordStrength.module.css';

/**
 * Visual meter for password complexity
 */
function PasswordStrength({ password }) {
  if (!password || password.length < 6) return null;

  const score = getPasswordStrength(password); // Expecting 1-4

  const config = {
    1: { label: 'Weak',   color: 'var(--err)',  level: 'weak'   },
    2: { label: 'Fair',   color: 'var(--warn)', level: 'medium' },
    3: { label: 'Good',   color: 'var(--warn)', level: 'medium' },
    4: { label: 'Strong', color: 'var(--ok)',   level: 'strong' },
  };

  const { label, color, level } = config[score] || config[1];

  return (
    <div className={styles.wrapper}>
      <div className={styles.bars}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`${styles.bar} ${i < score ? styles[level] : ''}`} />
        ))}
      </div>
      <span className={styles.label} style={{ color }}>{label}</span>
    </div>
  );
}

export default PasswordStrength;