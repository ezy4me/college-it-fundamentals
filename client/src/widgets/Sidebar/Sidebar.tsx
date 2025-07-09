import styles from './Sidebar.module.scss';
import { sections, type Section, type SectionTab } from '@/shared/const/sections';
import { NavLink } from 'react-router-dom';

type Props = {
  isCollapsed: boolean;
  onToggle: () => void;
};

const tabLabels: Record<SectionTab, string> = {
  lectures: 'Лекции',
  practices: 'Практики',
  labs: 'Лаб. работы',
};

export const Sidebar = ({ isCollapsed, onToggle }: Props) => {
  return (
    <aside className={`${styles.sidebar} ${isCollapsed ? styles.collapsed : ''}`}>
      <div className={styles.sidebarWrapper}>
        <button className={styles.toggleBtn} onClick={onToggle}>
          {isCollapsed ? '>' : '<'}
        </button>
        <nav className={styles.nav}>
          {sections.map((section) => (
            <SectionNav key={section.id} section={section} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>
    </aside>
  );
};

const SectionNav = ({
  section,
  isCollapsed,
}: {
  section: Section;
  isCollapsed: boolean;
}) => {
  return (
    <div className={styles.section}>
      <NavLink
        to={`/${section.id}`}
        end
        className={({ isActive }) =>
          isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
        }
      >
        <span className={styles.icon}>{section.icon}</span>
        {!isCollapsed && <span className={styles.label}>{section.title}</span>}
      </NavLink>

      {!isCollapsed &&
        Object.entries(section.tabs).map(([tab, path]) => (
          <NavLink
            key={tab}
            to={path}
            end
            className={({ isActive }) =>
              isActive ? `${styles.subNavItem} ${styles.active}` : styles.subNavItem
            }
          >
            {tabLabels[tab as SectionTab]}
          </NavLink>
        ))}
    </div>
  );
};
