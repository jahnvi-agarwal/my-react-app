import React, { useState } from 'react';
import InputField from './InputField';
import { validateEmail, validateLoginPassword } from '../utils/validators';
import styles from './AuthForms.module.css';

/* ── SVG Icons ── */
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
 * LoginForm
 * LocalStorage validation ke saath updated version.
 */
function LoginForm({ onSwitch, onSuccess }) {
  /* ── Form state ── */
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /* ── Error state ── */
  const [emailErr, setEmailErr] = useState('');
  const [pwErr, setPwErr] = useState('');

  /* ── Handlers ── */
  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (emailErr) setEmailErr(''); // Type karte waqt error hata dega
  }

  function handlePwChange(e) {
    setPassword(e.target.value);
    if (pwErr) setPwErr('');
  }

  /** Submit Handler with Local Check **/
  function handleSubmit(e) {
    e.preventDefault();
    
    const eResult = validateEmail(email);
    const pResult = validateLoginPassword(password);

    if (!eResult.valid || !pResult.valid) {
      setEmailErr(eResult.message);
      setPwErr(pResult.message);
      return;
    }

    // ─── LocalStorage Check ───
    const storedUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const foundUser = storedUsers.find(u => u.email === email);

    if (!foundUser) {
      setEmailErr('No account found with this email.');
    } else if (foundUser.password !== password) {
      setPwErr('Incorrect password. Please try again.');
    } else {
      // Login Success!
      onSuccess({ name: foundUser.name });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.fadeIn}>
      {/* Email Field */}
      <InputField
        id="login-email"
        label="Email Address"
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={() => setEmailErr(validateEmail(email).message)}
        placeholder="Enter your email"
        icon={<EmailIcon />}
        error={emailErr}
        isValid={email.length > 0 && !emailErr}
      />

      {/* Password Field */}
      <InputField
        id="login-pw"
        label="Password"
        type="password"
        value={password}
        onChange={handlePwChange}
        onBlur={() => setPwErr(validateLoginPassword(password).message)}
        placeholder="••••••••"
        icon={<LockIcon />}
        error={pwErr}
        isValid={password.length >= 6 && !pwErr}
      />

      {/* Forgot Password Link */}
      <div className={styles.forgotRow}>
        <span
          role="button"
          tabIndex={0}
          className={styles.forgotLink}
          onClick={() => onSuccess({ forgotPassword: true })}
        >
          Forgot password?
        </span>
      </div>

      {/* Submit Button */}
      <button type="submit" className={styles.btnSubmit}>
        Sign In
      </button>

      {/* Switch to Signup */}
      <p className={styles.footerLink}>
        Don't have an account?{' '}
        <span 
          role="button" 
          tabIndex={0} 
          onClick={onSwitch}
          className={styles.switchText}
        >
          Join Lumina for free
        </span>
      </p>
    </form>
  );
}

export default LoginForm;