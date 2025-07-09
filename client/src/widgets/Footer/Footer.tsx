import styles from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerWrapper}>
        © {new Date().getFullYear()} College
      </div>
    </footer>
  );
};
