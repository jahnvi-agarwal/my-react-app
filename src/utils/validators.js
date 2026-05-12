/**
 * Global Validators - Pure JS Functions
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validateEmail = (val) => {
  if (!val.trim()) return { valid: false, message: 'Email is required.' };
  if (!EMAIL_RE.test(val.trim())) return { valid: false, message: 'Invalid email format.' };
  return { valid: true, message: '' };
};

export const validateLoginPassword = (val) => {
  if (!val) return { valid: false, message: 'Password required.' };
  if (val.length < 6) return { valid: false, message: 'Min 6 characters.' };
  return { valid: true, message: '' };
};

export const validateName = (val) => {
  const clean = val.trim();
  if (!clean) return { valid: false, message: 'Name is required.' };
  if (!/^[a-zA-Z\s]+$/.test(clean)) return { valid: false, message: 'Alphabets only.' };
  if (clean.length < 3) return { valid: false, message: 'Too short (min 3 chars).' };
  return { valid: true, message: '' };
};

export const validateSignupPassword = (val) => {
  if (!val) return { valid: false, message: 'Password required.' };
  if (val.length < 6) return { valid: false, message: 'Minimum 6 characters.' };
  return { valid: true, message: '' };
};

export const getPasswordStrength = (pw) => {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^a-zA-Z0-9]/.test(pw)) score++;
  return score;
};