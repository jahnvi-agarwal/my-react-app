import React, { useState } from 'react';
import InputField from './InputField';
import AvatarUpload from './AvatarUpload';
import PasswordStrength from './PasswordStrength';
import {
  validateName,
  validateUsername,
  validateEmail,
  validatePhone,
  validateSignupPassword,
  validateConfirmPassword,
} from '../utils/validators';
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

const LockCheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 12 2 2 4-4" />
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const UserIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 14a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 3h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9a16 16 0 0 0 6.91 6.91l.21-.21a2 2 0 0 1 2.11-.45c.91.344 1.861.555 2.83.63A2 2 0 0 1 22 18z" />
  </svg>
);

/**
 * SignupForm
 * Controlled form for the Create Account tab.
 *
 * Props:
 *   onSwitch  {Function} - called to switch to the login tab
 *   onSuccess {Function} - called with form data on successful validation
 */
function SignupForm({ onSwitch, onSuccess }) {

  /* ── Form state ── */
  const [avatar,    setAvatar]    = useState(null);
  const [name,      setName]      = useState('');
  const [username,  setUsername]  = useState('');
  const [email,     setEmail]     = useState('');
  const [dialCode,  setDialCode]  = useState('+91');
  const [phone,     setPhone]     = useState('');
  const [password,  setPassword]  = useState('');
  const [confirm,   setConfirm]   = useState('');
  const [terms,     setTerms]     = useState(false);

  /* ── Error state ── */
  const [errors, setErrors] = useState({
    name: '', username: '', email: '',
    phone: '', password: '', confirm: '',
  });

  /* ── Helper: set a single field error ── */
  function setErr(field, message) {
    setErrors((prev) => ({ ...prev, [field]: message }));
  }

  /* ── Per-field change handlers ── */
  function handleNameChange(e) {
    setName(e.target.value);
    if (errors.name) setErr('name', validateName(e.target.value).message);
  }
  function handleUsernameChange(e) {
    setUsername(e.target.value.toLowerCase());
    if (errors.username) setErr('username', validateUsername(e.target.value).message);
  }
  function handleEmailChange(e) {
    setEmail(e.target.value);
    if (errors.email) setErr('email', validateEmail(e.target.value).message);
  }
  function handlePhoneChange(e) {
    setPhone(e.target.value);
    if (errors.phone) setErr('phone', validatePhone(e.target.value).message);
  }
  function handlePwChange(e) {
    setPassword(e.target.value);
    if (errors.password) setErr('password', validateSignupPassword(e.target.value).message);
    // Re-validate confirm if already filled
    if (confirm) setErr('confirm', validateConfirmPassword(e.target.value, confirm).message);
  }
  function handleConfirmChange(e) {
    setConfirm(e.target.value);
    if (errors.confirm) setErr('confirm', validateConfirmPassword(password, e.target.value).message);
  }

  /* ── Blur validators ── */
  const blurHandlers = {
    name:     () => setErr('name',     validateName(name).message),
    username: () => setErr('username', validateUsername(username).message),
    email:    () => setErr('email',    validateEmail(email).message),
    phone:    () => setErr('phone',    validatePhone(phone).message),
    password: () => setErr('password', validateSignupPassword(password).message),
    confirm:  () => setErr('confirm',  validateConfirmPassword(password, confirm).message),
  };

  /** Run all validations on submit */
  function handleSubmit(e) {
    e.preventDefault();

    // Validate all fields
    const result = {
      name:     validateName(name),
      username: validateUsername(username),
      email:    validateEmail(email),
      phone:    validatePhone(phone),
      password: validateSignupPassword(password),
      confirm:  validateConfirmPassword(password, confirm),
    };

    // Push all error messages into state
    setErrors({
      name:     result.name.message,
      username: result.username.message,
      email:    result.email.message,
      phone:    result.phone.message,
      password: result.password.message,
      confirm:  result.confirm.message,
    });

    // Terms check
    if (!terms) {
      onSuccess({ termsError: true });
      return;
    }

    // All valid?
    const allValid = Object.values(result).every((r) => r.valid);
    if (allValid) {
      onSuccess({ name, username, email, phone: dialCode + phone, avatar });
    }
  }

  /* ── Derived "ok" helpers ── */
  const ok = (field, value) => !errors[field] && value.length > 0;

  return (
    <form onSubmit={handleSubmit} noValidate>

      {/* Profile photo */}
      <AvatarUpload preview={avatar} onChange={setAvatar} />

      {/* Name + Username — 2-column grid */}
      <div className={styles.colTwo}>
        <InputField
          id="su-name"
          label="Full Name"
          type="text"
          value={name}
          onChange={handleNameChange}
          onBlur={blurHandlers.name}
          placeholder="Name"
          autoComplete="name"
          icon={<UserIcon />}
          error={errors.name}
          isValid={ok('name', name)}
        />
        <InputField
          id="su-username"
          label="Username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
          onBlur={blurHandlers.username}
          placeholder=""
          autoComplete="username"
          icon={<span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--text3)' }}>@</span>}
          error={errors.username}
          isValid={ok('username', username)}
          style={{ paddingLeft: '2.2rem' }}
        />
      </div>

      {/* Email */}
      <InputField
        id="su-email"
        label="Email Address"
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={blurHandlers.email}
        placeholder="you@example.com"
        autoComplete="email"
        icon={<EmailIcon />}
        error={errors.email}
        isValid={ok('email', email)}
      />

      {/* Phone — dial code + number */}
      <div className={styles.phoneRow}>
        <select
          className={styles.dialCode}
          value={dialCode}
          onChange={(e) => setDialCode(e.target.value)}
          aria-label="Country dial code"
        >
          {['+91','+1','+44','+61','+49','+33','+81','+86','+971','+65','+55','+7'].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <InputField
          id="su-phone"
          label={<>Phone <span className={styles.optional}>(optional)</span></>}
          type="tel"
          value={phone}
          onChange={handlePhoneChange}
          onBlur={blurHandlers.phone}
          placeholder="98765 43210"
          icon={<PhoneIcon />}
          error={errors.phone}
          isValid={ok('phone', phone)}
          style={{ flex: 1, marginBottom: 0 }}
        />
      </div>
      {/* Spacer to match field margin */}
      <div style={{ marginBottom: '1.1rem' }} />

      {/* Password */}
      <InputField
        id="su-pw"
        label="Password"
        type="password"
        value={password}
        onChange={handlePwChange}
        onBlur={blurHandlers.password}
        placeholder="Create a strong password"
        autoComplete="new-password"
        icon={<LockIcon />}
        error={errors.password}
        isValid={ok('password', password)}
      />
      {/* Strength meter — shown below password field */}
      <div style={{ marginTop: '-0.75rem', marginBottom: '1.1rem' }}>
        <PasswordStrength password={password} />
      </div>

      {/* Confirm Password */}
      <InputField
        id="su-confirm"
        label="Confirm Password"
        type="password"
        value={confirm}
        onChange={handleConfirmChange}
        onBlur={blurHandlers.confirm}
        placeholder="Re-enter your password"
        autoComplete="new-password"
        icon={<LockCheckIcon />}
        error={errors.confirm}
        isValid={ok('confirm', confirm)}
      />

      {/* Terms & Conditions */}
      <div className={styles.checkboxRow}>
        <input
          type="checkbox"
          id="su-terms"
          checked={terms}
          onChange={(e) => setTerms(e.target.checked)}
        />
        <label htmlFor="su-terms">
          I agree to the{' '}
          <a href="#terms" onClick={(e) => e.preventDefault()}>Terms of Service</a>
          {' '}and{' '}
          <a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
        </label>
      </div>

      {/* Submit */}
      <button type="submit" className={styles.btnSubmit}>
        Create Account
      </button>

      {/* Switch to login */}
      <p className={styles.footerLink}>
        Already have an account?{' '}
        <span role="button" tabIndex={0} onClick={onSwitch}
              onKeyDown={(e) => e.key === 'Enter' && onSwitch()}>
          Sign in
        </span>
      </p>
    </form>
  );
}

export default SignupForm;