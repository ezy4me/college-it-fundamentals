import styles from './NotFound.module.scss';

export const NotFound = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Страница не найдена</p>
      <p className={styles.description}>
        К сожалению, запрошенная страница не существует или была удалена.
      </p>
    </div>
  );
};
