import styles from './Sidebar.module.scss';
import { sections } from '@/shared/const/sections';
import { ToggleSection } from '@/features';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

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
