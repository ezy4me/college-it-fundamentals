import { useTheme } from '@/shared/lib/hooks/useTheme';
import { Theme } from '@/shared/const/theme';
import styles from './ThemeSwitcher.module.scss';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === Theme.DARK;

  return (
    <div className={styles['toggle-switch']}>
      <label className={styles['switch-label']}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isDark}
          onChange={toggleTheme}
        />
        <span className={styles.slider}></span>
      </label>
    </div>
  );
};
