import React from "react";
import { Loader } from "lucide-react";
import styles from "./LoadingMessage.module.scss";

export const LoadingMessage: React.FC = () => {
  return (
    <div
      className={styles.loading}
      role="status"
      aria-live="polite"
      aria-label="Загрузка контента"
      tabIndex={-1}
    >
      <Loader size={28} className={styles.spinner} aria-hidden="true" />
      <span className={styles.text}>Загрузка...</span>
    </div>
  );
};
