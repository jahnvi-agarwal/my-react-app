import React from 'react';
import styles from './Dashboard.module.css';

/**
 * Sidebar: Fixed 3-item navigation
 * Props: activeTab, setActiveTab, onLogout
 */
function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { name: 'Overview', icon: <HomeIcon /> },
    { name: 'Projects', icon: <ProjectIcon /> },
    { name: 'Hiring Analytics', icon: <CodeIcon /> },
  ];

  return (
    <nav className={styles.sidebar}>
      {/* Brand Branding */}
      <div className={styles.sidebarBrand}>
        <div className={styles.brandIcon}>L</div>
        <span>LUMINA</span>
      </div>

      {/* Dynamic Menu */}
      <div className={styles.navMenu}>
        {navItems.map((item) => (
          <div 
            key={item.name} 
            className={`${styles.navItem} ${activeTab === item.name ? styles.activeNavItem : ''}`}
            onClick={() => setActiveTab(item.name)}
            role="button"
            tabIndex={0}
          >
            <span className={styles.iconWrapper}>{item.icon}</span>
            <span className={styles.navText}>{item.name}</span>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className={styles.sidebarFooter}>
        <button className={styles.logoutBtn} onClick={onLogout}>
          <LogoutIcon />
          <span>Sign Out</span>
        </button>
      </div>
    </nav>
  );
}

// Minimal Icons
const HomeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const ProjectIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/></svg>;
const CodeIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>;
const LogoutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>;

export default Sidebar;