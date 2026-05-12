import React, { useState } from 'react';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import styles from './AuthPage.module.css';
import backgroundImage from '../auth-bg.jpg';

/**
 * AuthPage - Integrated with Dashboard Routing
 */
function AuthPage({ onLoginSuccess }) {
  const [activeTab, setActiveTab] = useState('login');
  const [isSuccess, setIsSuccess] = useState(false);
  const [userName, setUserName] = useState('');
  const [successType, setSuccessType] = useState('auth'); // 'auth' | 'reset'

  /* ── Success Handlers ── */
  const handleLoginSuccess = (data) => {
    if (data.forgotPassword) {
      setSuccessType('reset');
      setIsSuccess(true);
    } else {
      setUserName(data.name || 'User');
      setSuccessType('auth');
      setIsSuccess(true);

      // Animation dikhane ke baad Dashboard par bhejne ke liye logic
      setTimeout(() => {
        onLoginSuccess(data);
      }, 2500); // 2.5 seconds success screen dikhegi
    }
  };

  const handleSignupSuccess = (data) => {
    setUserName(data.name || 'User');
    setSuccessType('auth');
    setIsSuccess(true);

    // Signup ke baad bhi dashboard par bhej rahe hain
    setTimeout(() => {
      onLoginSuccess(data);
    }, 2500);
  };

  return (
    <div className={styles.page}>
      {/* Dynamic Background */}
      <div 
        className={styles.background} 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      <div className={styles.overlay} />

      <div className={styles.container}>
        <header className={styles.logo}>
          <div className={styles.logoIcon}>
            <LayersIcon />
          </div>
          <h1 className={styles.logoName}>LUMINA</h1>
        </header>

        <main className={styles.card}>
          {isSuccess ? (
            /* ─── Premium Success Screen ─── */
            <div className={styles.successWrapper}>
              <div className={styles.checkIcon}>
                <svg viewBox="0 0 52 52" className={styles.checkmark}>
                  <circle className={styles.checkmarkCircle} cx="26" cy="26" r="25" fill="none"/>
                  <path className={styles.checkmarkCheck} fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>

              {successType === 'reset' ? (
                <>
                  <h2 className={styles.successTitle}>Check Your Inbox!</h2>
                  <p className={styles.successSub}>
                    We've sent a password reset link to your email address.
                  </p>
                  <button 
                    className={styles.btnSubmit} 
                    style={{ marginTop: '2.5rem' }}
                    onClick={() => setIsSuccess(false)}
                  >
                    Back to Login
                  </button>
                </>
              ) : (
                <>
                  <h2 className={styles.successTitle}>Welcome, {userName}!</h2>
                  <p className={styles.successSub}>Redirecting to your dashboard...</p>
                </>
              )}
            </div>
          ) : (
            /* ─── Auth Form UI ─── */
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

function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M2 17L12 22L22 17" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M2 12L12 17L22 12" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

export default AuthPage;