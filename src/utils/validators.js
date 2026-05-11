/**
 * validators.js
 * Pure validation functions — no React dependencies.
 * Each function returns { valid: boolean, message: string }.
 */

/** Standard email regex */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates an email address.
 * @param {string} value
 * @returns {{ valid: boolean, message: string }}
 */
export function validateEmail(value) {
  if (!value.trim()) return { valid: false, message: 'Email is required.' };
  if (!EMAIL_RE.test(value.trim()))
    return { valid: false, message: 'Please enter a valid email address.' };
  return { valid: true, message: '' };
}

/**
 * Validates a login password.
 * Rules: min 6 chars, no spaces.
 * @param {string} value
 */
export function validateLoginPassword(value) {
  if (!value) return { valid: false, message: 'Password is required.' };
  if (value.length < 6)
    return { valid: false, message: 'Password must be at least 6 characters.' };
  if (/\s/.test(value))
    return { valid: false, message: 'Password must not contain spaces.' };
  return { valid: true, message: '' };
}

/**
 * Validates a full name.
 * Rules: alphabets + spaces only, min 3 non-space chars.
 * @param {string} value
 */
export function validateName(value) {
  if (!value.trim()) return { valid: false, message: 'Full name is required.' };
  if (!/^[a-zA-Z\s]+$/.test(value))
    return { valid: false, message: 'Name must contain letters only.' };
  if (value.replace(/\s/g, '').length < 3)
    return { valid: false, message: 'Name must be at least 3 characters.' };
  return { valid: true, message: '' };
}

/**
 * Validates a username.
 * Rules: lowercase letters, numbers, underscore; 3–20 chars.
 * @param {string} value
 */
export function validateUsername(value) {
  if (!value) return { valid: true, message: '' }; // optional field
  if (!/^[a-z0-9_]{3,20}$/.test(value))
    return { valid: false, message: '3–20 chars: lowercase, numbers, _ only.' };
  return { valid: true, message: '' };
}

/**
 * Validates a phone number (optional).
 * Rules: if provided, must be 7–15 digits.
 * @param {string} value
 */
export function validatePhone(value) {
  const digits = value.replace(/\s/g, '');
  if (!digits) return { valid: true, message: '' }; // optional
  if (!/^\d{7,15}$/.test(digits))
    return { valid: false, message: 'Enter a valid 7–15 digit phone number.' };
  return { valid: true, message: '' };
}

/**
 * Validates a signup password.
 * Rules: min 6 chars (strength scoring is separate).
 * @param {string} value
 */
export function validateSignupPassword(value) {
  if (!value) return { valid: false, message: 'Password is required.' };
  if (value.length < 6)
    return { valid: false, message: 'Password must be at least 6 characters.' };
  return { valid: true, message: '' };
}

/**
 * Validates confirm password matches the original.
 * @param {string} password
 * @param {string} confirm
 */
export function validateConfirmPassword(password, confirm) {
  if (!confirm) return { valid: false, message: 'Please confirm your password.' };
  if (confirm !== password)
    return { valid: false, message: 'Passwords do not match.' };
  return { valid: true, message: '' };
}

/**
 * Scores password strength on a scale of 0–4.
 * Criteria: length ≥6, length ≥10, mixed case, digit + special char.
 * @param {string} pw
 * @returns {number} 0–4
 */
export function getPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^a-zA-Z0-9]/.test(pw)) score++;
  return score;
}