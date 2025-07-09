import { useTheme } from "@/shared/lib/hooks/useTheme";
import styles from "./HomePage.module.scss";

const items = ["Элемент 1", "Элемент 2", "Элемент 3"];

export const HomePage = () => {
    const { theme } = useTheme();
  
  return (
    <div className={`${styles.container}`}>
      <ul className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {item}
            <p className={styles.description}>
              Это описание для <strong>{item}</strong>, показывающее адаптацию
              цвета и стиля в теме {theme}.
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
