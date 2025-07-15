import { ThemeSwitcher } from '@/shared';
import { Breadcrumbs } from '@/features';
import styles from './AppBar.module.scss';

export const AppBar = () => {
  return (
    <header className={styles.appbar}>
      <div className={styles.headerWrapper}>
        <Breadcrumbs />
        <ThemeSwitcher />
      </div>
    </header>
  );
};
