import styles from './Sidebar.module.scss';

type Props = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export const Sidebar = ({ isCollapsed, onToggle }: Props) => {
  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarWrapper}>
        <button className={styles.toggleBtn} onClick={onToggle}>
          {isCollapsed ? '>' : '<'}
        </button>
        <nav className={styles.nav}>
          <div className={styles.navItem}>
            <span className={styles.icon}>📊</span>
            {!isCollapsed && <span className={styles.label}>Dashboard</span>}
          </div>
          <div className={styles.navItem}>
            <span className={styles.icon}>📚</span>
            {!isCollapsed && <span className={styles.label}>Courses</span>}
          </div>
          <div className={styles.navItem}>
            <span className={styles.icon}>👨‍🎓</span>
            {!isCollapsed && <span className={styles.label}>Students</span>}
          </div>
        </nav>
      </div>
    </aside>
  );
};
