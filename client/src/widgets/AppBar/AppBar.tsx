import { ThemeSwitcher } from '@/shared';
import styles from './AppBar.module.scss';

export const AppBar = () => {
  return (
    <header className={styles.appbar}>
      <div className={styles.headerWrapper}>
        <div className={styles.title}>Header Content</div>
        <ThemeSwitcher />
      </div>
    </header>
  );
};
