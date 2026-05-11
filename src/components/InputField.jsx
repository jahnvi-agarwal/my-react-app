import React, { useState } from 'react';
import styles from './InputField.module.css';

/**
 * InputField — reusable form input with icon, validation state,
 * optional password-toggle, and animated error message.
 *
 * Props:
 *   id          {string}   - unique field ID (links label → input)
 *   label       {string}   - uppercase label text
 *   type        {string}   - input type: 'text' | 'email' | 'password' | 'tel'
 *   value       {string}   - controlled value
 *   onChange    {Function} - change handler
 *   onBlur      {Function} - optional blur handler for validation
 *   placeholder {string}
 *   error       {string}   - error message (empty = no error)
 *   isValid     {boolean}  - true shows green "ok" state
 *   icon        {JSX}      - SVG icon element
 *   autoComplete{string}
 *   style       {object}   - optional extra styles on the wrapper
 */
function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  isValid,
  icon,
  autoComplete,
  style,
}) {
  // Track whether password is visible (for password fields)
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType  = isPassword ? (showPassword ? 'text' : 'password') : type;

  // Derive CSS class for validation state
  const inputClass = [
    styles.input,
    error   ? styles.inputError : '',
    isValid ? styles.inputOk    : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={styles.field} style={style}>
      {/* Label */}
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>

      {/* Input + icons wrapper */}
      <div className={styles.inputWrap}>
        {/* Left icon */}
        {icon && (
          <span className={styles.icon} aria-hidden="true">
            {icon}
          </span>
        )}

        {/* The actual input */}
        <input
          id={id}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={inputClass}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
        />

        {/* Password toggle button */}
        {isPassword && (
          <button
            type="button"
            className={styles.togglePw}
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOffIcon /> : <EyeIcon />}
          </button>
        )}
      </div>

      {/* Animated error message */}
      {error && (
        <div
          className={styles.errMsg}
          id={`${id}-error`}
          role="alert"
          aria-live="polite"
        >
          <AlertIcon />
          {error}
        </div>
      )}
    </div>
  );
}

/* ── Inline SVG icons ── */

function EyeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
      <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
      <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
      <line x1="2" x2="22" y1="2" y2="22" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="12" />
      <line x1="12" x2="12.01" y1="16" y2="16" />
    </svg>
  );
}

export default InputField;