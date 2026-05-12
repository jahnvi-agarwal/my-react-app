import React, { useState } from 'react';
import InputField from './InputField';
import PasswordStrength from './PasswordStrength';
import { validateName, validateEmail, validateSignupPassword } from '../utils/validators';
import styles from './AuthForms.module.css';

function SignupForm({ onSwitch, onSuccess }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});

  // Centralized change handler
  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = formData;

    const nRes = validateName(name);
    const eRes = validateEmail(email);
    const pRes = validateSignupPassword(password);

    if (!nRes.valid || !eRes.valid || !pRes.valid) {
      setErrors({ name: nRes.message, email: eRes.message, password: pRes.message });
      return;
    }

    // Check LocalStorage for existing users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.some(u => u.email === email)) {
      setErrors({ email: 'This email is already registered!' });
      return;
    }

    // Save and Proceed
    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    onSuccess({ name, email });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className={styles.fadeIn}>
      <InputField
        id="su-name" label="Full Name" type="text"
        value={formData.name} icon={<UserIcon />} error={errors.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Enter your name"
      />
      <InputField
        id="su-email" label="Email Address" type="email"
        value={formData.email} icon={<EmailIcon />} error={errors.email}
        onChange={(e) => handleChange('email', e.target.value)}
        placeholder="hello@example.com"
      />
      <InputField
        id="su-pw" label="Password" type="password"
        value={formData.password} icon={<LockIcon />} error={errors.password}
        onChange={(e) => handleChange('password', e.target.value)}
        placeholder="••••••••"
      />

      <div style={{ marginTop: '-0.75rem', marginBottom: '1.5rem' }}>
        <PasswordStrength password={formData.password} />
      </div>

      <button type="submit" className={styles.btnSubmit}>Create Account</button>

      <p className={styles.footerLink}>
        Already registered? <span onClick={onSwitch}>Sign in</span>
      </p>
    </form>
  );
}

// Icons (Same as your file)
const UserIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>;
const EmailIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
const LockIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>;

export default SignupForm;