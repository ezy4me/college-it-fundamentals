import clsx from 'clsx';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { ToggleSection } from '@/features/ToggleSection';
import { sections } from '@/shared/const/sections';

import styles from './Sidebar.module.scss';


type Props = {
  isCollapsed: boolean;
  onToggle: () => void;
};

export const Sidebar = ({ isCollapsed, onToggle }: Props) => {
  return (
    <aside className={clsx(styles.sidebar, { [styles.collapsed]: isCollapsed })}>
      <div className={styles.sidebarWrapper}>
        <button className={styles.toggleBtn} onClick={onToggle} aria-label="Toggle Sidebar">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <nav className={styles.nav}>
          {sections.map((section) => (
            <ToggleSection key={section.id} section={section} isCollapsed={isCollapsed} />
          ))}
        </nav>
      </div>
    </aside>
  );
};
