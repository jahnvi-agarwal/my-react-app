import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import styles from './Dashboard.module.css';

function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('Overview');
  const [candidateLink, setCandidateLink] = useState('');
  const [analyzedCandidate, setAnalyzedCandidate] = useState(null);
  const [selectedCandidates, setSelectedCandidates] = useState([]);

  // Projects Data
  const projects = [
    { name: "NoteMark", tag: "Full Stack", link: "https://note-mark-nu.vercel.app/" },
    { name: "Portfolio Website", tag: "Frontend", link: "https://prodigy-wd-04-nu.vercel.app" }
  ];

  // Tech Stack for Overview
  const techStack = [
    { name: 'React.js', level: 'Advanced', color: '#61dafb' },
    { name: 'JavaScript', level: 'Expert', color: '#f7df1e' },
    { name: 'HTML5/CSS3', level: 'Expert', color: '#e34f26' },
    { name: 'Node.js', level: 'Intermediate', color: '#68a063' }
  ];

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('selectedCandidates') || '[]');
    setSelectedCandidates(saved);
  }, []);

  return (
    <div className={styles.layout}>
      {/* Make sure to remove Settings from your Sidebar.jsx component as well */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={onLogout} />
      
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          
          {/* ── OVERVIEW ── */}
          {activeTab === 'Overview' && (
            <div className={styles.fadeIn}>
              <header className={styles.header}>
                <h1 className={styles.greeting}>Welcome</h1>
                <span className={styles.highlight}>{user?.name || 'Jahnvi Agarwal'}</span>
              </header>
              <section className={styles.dashboardGrid}>
                <div className={`${styles.glassCard} ${styles.profileCard}`}>
                  <div className={styles.avatarPlaceholder}>JA</div>
                  <h3>Jahnvi Agarwal</h3>
                  <p>Frontend Developer</p>
                </div>
                <div className={`${styles.glassCard} ${styles.techCard}`}>
                  <h3>Expertise</h3>
                  {techStack.map(t => (
                    <div key={t.name} className={styles.techItem}>
                      <div className={styles.techInfo}><span>{t.name}</span></div>
                      <div className={styles.progressBar}>
                        <div className={styles.progressFill} style={{width: '80%', backgroundColor: t.color}}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}

          {/* ── PROJECTS ── */}
          {activeTab === 'Projects' && (
            <div className={styles.fadeIn}>
              <h2 className={styles.tabTitle}>My Projects</h2>
              <div className={styles.projectGrid}>
                {projects.map((p, i) => (
                  <div key={i} className={styles.glassCard}>
                    <span className={styles.projectTag}>{p.tag}</span>
                    <h4>{p.name}</h4>
                    <button className={styles.actionBtn} onClick={() => window.open(p.link, '_blank')}>Visit Project</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── HIRING INSIGHTS (Replaced Skills) ── */}
          {activeTab === 'Hiring Analytics' && (
            <div className={styles.fadeIn}>
              <h2 className={styles.tabTitle}>Hiring Analytics</h2>
              <div className={styles.dashboardGrid}>
                <div className={styles.glassCard}>
                  <h3>Candidate Pipeline</h3>
                  <div style={{fontSize: '2.5rem', fontWeight: '800', margin: '15px 0', color: '#afa9ec'}}>142</div>
                  <p style={{opacity: 0.6}}>Profiles scanned this month</p>
                </div>
                <div className={styles.glassCard}>
                  <h3>Success Ratio</h3>
                  <div style={{fontSize: '2.5rem', fontWeight: '800', margin: '15px 0', color: '#1d9e75'}}>88%</div>
                  <p style={{opacity: 0.6}}>Match accuracy rating</p>
                </div>
                <div className={`${styles.glassCard} ${styles.fullWidthCard}`}>
                  <h3>System Activity Log</h3>
                  <ul style={{listStyle: 'none', padding: 0, marginTop: '15px'}}>
                    <li style={{padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>✅ Verification Pass: candidate_id_99</li>
                    <li style={{padding: '10px 0', borderBottom: '1px solid rgba(255,255,255,0.05)'}}>❌ Location Mismatch: candidate_id_102</li>
                    <li style={{padding: '10px 0'}}>📩 Invite Sent: Senior Frontend Role</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

export default Dashboard;