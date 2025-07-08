import styles from './HomePage.module.scss';

const items = ['Элемент 1', 'Элемент 2', 'Элемент 3'];

export const HomePage = () => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
