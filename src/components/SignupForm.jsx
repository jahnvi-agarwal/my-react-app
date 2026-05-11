import React, { useState } from 'react';
import InputField from './InputField';
import PasswordStrength from './PasswordStrength';
import {
  validateName,
  validateEmail,
  validateSignupPassword,
} from '../utils/validators';
import styles from './AuthForms.module.css';

/* ── SVG Icons ── */
const UserIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EmailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const LockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

/**
 * SignupForm
 * Clean UI + Duplicate Email Check Logic
 */
function SignupForm({ onSwitch, onSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  /** Validation Logic on Submit **/
  const handleSubmit = (e) => {
    e.preventDefault();

    const nRes = validateName(name);
    const eRes = validateEmail(email);
    const pRes = validateSignupPassword(password);

    // Initial validation check
    if (!nRes.valid || !eRes.valid || !pRes.valid) {
      setErrors({
        name: nRes.message,
        email: eRes.message,
        password: pRes.message,
      });
      return;
    }

    // ─── Deduplication Check (localStorage) ───
    const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const isAlreadyRegistered = existingUsers.some(u => u.email === email);

    if (isAlreadyRegistered) {
      setErrors({ email: 'This email is already registered!' });
      return;
    }

    // Save new user if everything is fine
    const newUser = { name, email, password };
    existingUsers.push(newUser);
    localStorage.setItem('users', JSON.stringify(existingUsers));

    // Success transition
    onSuccess({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.fadeIn}>
      {/* Name Field */}
      <InputField
        id="su-name"
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          if (errors.name) setErrors({ ...errors, name: '' });
        }}
        onBlur={() => setErrors({ ...errors, name: validateName(name).message })}
        placeholder="Enter your name"
        icon={<UserIcon />}
        error={errors.name}
        isValid={name.length >= 3 && !errors.name}
      />

      {/* Email Field */}
      <InputField
        id="su-email"
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (errors.email) setErrors({ ...errors, email: '' });
        }}
        onBlur={() => setErrors({ ...errors, email: validateEmail(email).message })}
        placeholder="hello@example.com"
        icon={<EmailIcon />}
        error={errors.email}
        isValid={email.includes('@') && !errors.email}
      />

      {/* Password Field */}
      <InputField
        id="su-pw"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          if (errors.password) setErrors({ ...errors, password: '' });
        }}
        onBlur={() => setErrors({ ...errors, password: validateSignupPassword(password).message })}
        placeholder="••••••••"
        icon={<LockIcon />}
        error={errors.password}
        isValid={password.length >= 6 && !errors.password}
      />

      {/* Password Strength Meter */}
      <div style={{ marginTop: '-0.75rem', marginBottom: '1.5rem' }}>
        <PasswordStrength password={password} />
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles.btnSubmit}>
        Create Account
      </button>

      {/* Switch to Login */}
      <p className={styles.footerLink}>
        Already have an account?{' '}
        <span 
          role="button" 
          tabIndex={0} 
          onClick={onSwitch}
          className={styles.switchText}
        >
          Sign in
        </span>
      </p>
    </form>
  );
}

export default SignupForm;