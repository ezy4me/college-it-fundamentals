import styles from './AppBar.module.scss';

export const AppBar = () => {
  return (
    <header className={styles.appbar}>
      <div className={styles.headerWrapper}>
        Header Content
      </div>
    </header>
  );
};
