import { useState, type KeyboardEvent } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './ToggleSection.module.scss';
import type { Section, SectionTab } from '@/shared/const/sections';

const tabLabels: Record<SectionTab, string> = {
  lectures: 'Лекции',
  practices: 'Практики',
  labs: 'Лаб. работы',
};

interface Props {
  section: Section;
  isCollapsed: boolean;
}

export const ToggleSection = ({ section, isCollapsed }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter') {
      toggle();
    }
  };

  return (
    <div className={styles.section}>
      <div
        className={styles.sectionHeader}
        onClick={toggle}
        role="button"
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        <NavLink
          to={`/${section.id}`}
          end
          className={({ isActive }) =>
            isActive ? `${styles.navItem} ${styles.active}` : styles.navItem
          }
        >
          <span className={styles.icon}>{section.icon()}</span>
          {!isCollapsed && <span className={styles.label}>{section.title}</span>}
        </NavLink>
      </div>

      {!isCollapsed && isOpen && (
        <div className={styles.subItems}>
          {Object.entries(section.tabs).map(([tab, path]) => (
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
      )}
    </div>
  );
};
