import React from 'react';
import Sidebar from './Sidebar';
import styles from './Dashboard.module.css';

function Dashboard({ user, onLogout }) {
  const techStack = [
    { name: 'React.js', level: 'Advanced', color: '#61dafb' },
    { name: 'JavaScript', level: 'Expert', color: '#f7df1e' },
    { name: 'HTML5/CSS3', level: 'Expert', color: '#e34f26' },
    { name: 'Node.js', level: 'Intermediate', color: '#68a063' }
  ];

  return (
    <div className={styles.layout}>
      <Sidebar onLogout={onLogout} />
      
      <main className={styles.mainContent}>
        {/* Top Greeting Section */}
        <header className={styles.header}>
          <div className={styles.headerInfo}>
            <h1 className={styles.greeting}>Core Dashboard</h1>
            <p className={styles.subText}>Welcome back, <span className={styles.highlight}>{user?.name || 'Mahak Gupta'}</span></p>
          </div>
          <div className={styles.headerStats}>
            <div className={styles.statBox}>
              <span className={styles.statLabel}>Project Status</span>
              <span className={styles.statVal}>Active</span>
            </div>
          </div>
        </header>

        <section className={styles.dashboardGrid}>
          {/* Profile Quick View */}
          <div className={`${styles.glassCard} ${styles.profileCard}`}>
            <div className={styles.avatarPlaceholder}>JA</div>
            <div className={styles.profileDetails}>
              <h3>Jahnvi Agarwal</h3>
              <p>Frontend Developer & React Enthusiast</p>
              <div className={styles.socialIcons}>
                <span>GitHub</span> • <span>LinkedIn</span> • <span>Portfolio</span>
              </div>
            </div>
          </div>

          {/* Project Highlights */}
         {/* Project Highlights Section mein button update karein */}
<div className={`${styles.glassCard} ${styles.projectCard}`}>
  <div className={styles.cardHeader}>
    <h3>Active Project</h3>
    <span className={styles.badge}>Live</span>
  </div>
  <h4>Local Store Web Application</h4>
  <p>A full-stack e-commerce solution built with modern web standards.</p>
  
  {/* Yahan onClick handler add karein */}
  <button 
    className={styles.actionBtn} 
    onClick={() => window.open('https://prodigy-wd-04-nu.vercel.app', '_blank')}
  >
    Open Project
  </button>
</div>
          {/* Tech Stack Visualizer */}
          <div className={`${styles.glassCard} ${styles.techCard}`}>
            <h3>Technical Expertise</h3>
            <div className={styles.techList}>
              {techStack.map((tech) => (
                <div key={tech.name} className={styles.techItem}>
                  <div className={styles.techInfo}>
                    <span>{tech.name}</span>
                    <small>{tech.level}</small>
                  </div>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progressFill} 
                      style={{ width: tech.level === 'Expert' ? '90%' : '70%', backgroundColor: tech.color }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;