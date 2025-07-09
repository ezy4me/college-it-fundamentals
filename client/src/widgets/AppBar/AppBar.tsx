import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Theme } from '@/shared/const/theme';
import styles from './AppBar.module.scss';

export const AppBar = () => {
  const { theme, toggleTheme } = useTheme();

  const getThemeLabel = (theme: Theme) => {
    switch (theme) {
      case Theme.DARK:
        return '🌙';
      case Theme.LIGHT:
        return '🌞';
      default:
        return '🎨';
    }
  };

  return (
    <header className={styles.appbar}>
      <div className={styles.headerWrapper}>
        <div className={styles.title}>Header Content</div>
        <button className={styles.themeToggleBtn} onClick={() => toggleTheme()}>
          {getThemeLabel(theme)}
        </button>
      </div>
    </header>
  );
};
