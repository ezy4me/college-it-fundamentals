import { ThemeSwitcher } from '@/shared';
import { Breadcrumbs } from '@/features/ToggleSection';
import { Menu } from 'lucide-react';
import styles from './AppBar.module.scss';

type Props = {
  onBurgerClick?: () => void;
};

export const AppBar = ({ onBurgerClick }: Props) => {
  return (
    <header className={styles.appbar}>
      <div className={styles.headerWrapper}>
        <Breadcrumbs />
        <div className={styles.actions}>
          <ThemeSwitcher />
          <button className={styles.burgerBtn} onClick={onBurgerClick}>
            <Menu size={28} />
          </button>
        </div>
      </div>
    </header>
  );
};
