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
 * Controlled form for the Sign In tab.
 *
 * Props:
 *   onSwitch   {Function} - called to switch to the signup tab
 *   onSuccess  {Function} - called with { email } on successful validation
 */
function LoginForm({ onSwitch, onSuccess }) {
  /* ── Form state ── */
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  /* ── Error state ── */
  const [emailErr, setEmailErr]    = useState('');
  const [pwErr,    setPwErr]       = useState('');

  /* ── Derived "ok" flags ── */
  const emailOk = !emailErr && email.length > 0;
  const pwOk    = !pwErr    && password.length > 0;

  /* ── Handlers ── */
  function handleEmailChange(e) {
    setEmail(e.target.value);
    // Clear error while typing; only re-validate if previously errored
    if (emailErr) setEmailErr(validateEmail(e.target.value).message);
  }

  function handlePwChange(e) {
    setPassword(e.target.value);
    if (pwErr) setPwErr(validateLoginPassword(e.target.value).message);
  }

  function handleEmailBlur() {
    setEmailErr(validateEmail(email).message);
  }

  function handlePwBlur() {
    setPwErr(validateLoginPassword(password).message);
  }

  /** Run full validation on submit */
  function handleSubmit(e) {
    e.preventDefault();
    const eResult = validateEmail(email);
    const pResult = validateLoginPassword(password);

    setEmailErr(eResult.message);
    setPwErr(pResult.message);

    if (eResult.valid && pResult.valid) {
      onSuccess({ email });
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate>

      {/* Email */}
      <InputField
        id="login-email"
        label="Email Address"
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleEmailBlur}
        placeholder="you@example.com"
        autoComplete="email"
        icon={<EmailIcon />}
        error={emailErr}
        isValid={emailOk}
      />

      {/* Password */}
      <InputField
        id="login-pw"
        label="Password"
        type="password"
        value={password}
        onChange={handlePwChange}
        onBlur={handlePwBlur}
        placeholder="Min. 6 characters"
        autoComplete="current-password"
        icon={<LockIcon />}
        error={pwErr}
        isValid={pwOk}
      />

      {/* Forgot password */}
      <div className={styles.forgotRow}>
        <span
          role="button"
          tabIndex={0}
          className={styles.forgotLink}
          onClick={() => onSuccess({ forgotPassword: true })}
          onKeyDown={(e) => e.key === 'Enter' && onSuccess({ forgotPassword: true })}
        >
          Forgot password?
        </span>
      </div>

      {/* Submit */}
      <button type="submit" className={styles.btnSubmit}>
        Sign In
      </button>

      {/* Switch to signup */}
      <p className={styles.footerLink}>
        Don't have an account?{' '}
        <span role="button" tabIndex={0} onClick={onSwitch}
              onKeyDown={(e) => e.key === 'Enter' && onSwitch()}>
          Create one free
        </span>
      </p>
    </form>
  );
}

export default LoginForm;