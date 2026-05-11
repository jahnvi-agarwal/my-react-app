import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Toast from './Toast';
import useToast from '../hooks/useToast';
import styles from './AuthPage.module.css';

/**
 * AuthPage
 * Top-level page component.
 * Manages which tab is active and owns the toast state.
 */
function AuthPage() {
  // 'login' | 'signup'
  const [activeTab, setActiveTab] = useState('login');

  // Toast hook
  const { message, visible, showToast } = useToast();

  /* ── Login success handler ── */
  function handleLoginSuccess(data) {
    if (data.forgotPassword) {
      showToast('Password reset link sent to your email.');
    } else {
      showToast('Welcome back! Signing you in…');
      // TODO: call your auth API here, e.g.:
      // await fetch('/api/login', { method:'POST', body: JSON.stringify(data) })
    }
  }

  /* ── Signup success handler ── */
  function handleSignupSuccess(data) {
    if (data.termsError) {
      showToast('Please agree to the Terms of Service to continue.');
    } else {
      showToast('Account created! Welcome to Lumina 🎉');
      // TODO: call your auth API here, e.g.:
      // await fetch('/api/register', { method:'POST', body: JSON.stringify(data) })
    }
  }

  return (
    <div className={styles.page}>

      {/* ── Ambient background orbs ── */}
      <div className={styles.orbTop}    aria-hidden="true" />
      <div className={styles.orbBottom} aria-hidden="true" />

      <div className={styles.container}>

        {/* ── Logo ── */}
        <header className={styles.logo}>
          <div className={styles.logoMark} aria-hidden="true">
            <LayersIcon />
          </div>
          <h1 className={styles.logoName}>Lumina</h1>
          <p className={styles.logoSub}>Your workspace, elevated.</p>
        </header>

        {/* ── Card ── */}
        <main className={styles.card}>

          {/* Tab switcher */}
          <div className={styles.tabs} role="tablist" aria-label="Authentication">
            <button
              role="tab"
              className={[styles.tab, activeTab === 'login' ? styles.tabActive : ''].join(' ')}
              aria-selected={activeTab === 'login'}
              onClick={() => setActiveTab('login')}
            >
              Sign In
            </button>
            <button
              role="tab"
              className={[styles.tab, activeTab === 'signup' ? styles.tabActive : ''].join(' ')}
              aria-selected={activeTab === 'signup'}
              onClick={() => setActiveTab('signup')}
            >
              Create Account
            </button>
          </div>

          {/* Forms — only the active one is mounted */}
          <div
            key={activeTab}           /* re-mount on tab switch → reset state + re-run animation */
            className={styles.formPanel}
            role="tabpanel"
          >
            {activeTab === 'login' ? (
              <LoginForm
                onSwitch={() => setActiveTab('signup')}
                onSuccess={handleLoginSuccess}
              />
            ) : (
              <SignupForm
                onSwitch={() => setActiveTab('login')}
                onSuccess={handleSignupSuccess}
              />
            )}
          </div>

        </main>
      </div>

      {/* ── Toast notification ── */}
      <Toast message={message} visible={visible} />
    </div>
  );
}

/* ── Logo SVG ── */
function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none"
         xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z"
            stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M2 17L12 22L22 17"
            stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M2 12L12 17L22 12"
            stroke="white" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default AuthPage;