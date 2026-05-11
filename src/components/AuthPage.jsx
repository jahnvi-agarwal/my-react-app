import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from './AuthPage.module.css';
import backgroundImage from '../auth-bg.jpg';

function AuthPage() {
  const [activeTab, setActiveTab] = useState('login');
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const [successType, setSuccessType] = useState('auth'); // 'auth' | 'reset'

  /* ── Modified Login Handler ── */
  function handleLoginSuccess(data) {
    if (data.forgotPassword) {
      // Jab Forgot Password click ho
      setSuccessType('reset');
      setIsSuccess(true);
    } else {
      // Normal Login success
      setUserName(data.name || 'User');
      setSuccessType('auth');
      setIsSuccess(true);
    }
  }

  function handleSignupSuccess(data) {
    setUserName(data.name || 'User');
    setSuccessType('auth');
    setIsSuccess(true);
  }

  return (
    <div className={styles.page}>
      <div 
        className={styles.background} 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <header className={styles.logo}>
          <h1 className={styles.logoName}>LUMINA</h1>
        </header>

        <main className={styles.card}>
          {isSuccess ? (
            <div className={styles.successWrapper}>
              <div className={styles.checkIcon}>
                <svg viewBox="0 0 52 52" className={styles.checkmark}>
                  <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                  <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>

              {/* Conditional Message Based on Action */}
              {successType === 'reset' ? (
                <>
                  <h2 className={styles.successTitle}>Check Your Inbox!</h2>
                  <p className={styles.successSub}>
                    We've sent a password reset link to your email address.
                  </p>
                </>
              ) : (
                <>
                  <h2 className={styles.successTitle}>Welcome, {userName}!</h2>
                  <p className={styles.successSub}>Your journey with Lumina begins now.</p>
                </>
              )}
              
              <button 
                className={styles.btnSubmit} 
                style={{ marginTop: '2rem' }}
                onClick={() => setIsSuccess(false)}
              >
                Back to Home
              </button>
            </div>
          ) : (
            <>
              <div className={styles.tabs}>
                <button
                  className={`${styles.tab} ${activeTab === 'login' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('login')}
                >
                  Sign In
                </button>
                <button
                  className={`${styles.tab} ${activeTab === 'signup' ? styles.tabActive : ''}`}
                  onClick={() => setActiveTab('signup')}
                >
                  Join Now
                </button>
              </div>

              <div key={activeTab} className={styles.formPanel}>
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
            </>
          )}
        </main>
      </div>
    </div>
  );
}

export default AuthPage;