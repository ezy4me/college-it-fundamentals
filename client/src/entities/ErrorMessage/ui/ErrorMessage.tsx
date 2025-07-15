import React from "react";
import { AlertCircle } from "lucide-react";
import styles from "./ErrorMessage.module.scss";

interface ErrorMessageProps {
  children: React.ReactNode;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ children }) => {
  return (
    <div className={styles.error} role="alert" aria-live="assertive" tabIndex={-1}>
      <AlertCircle size={28} className={styles.icon} aria-hidden="true" />
      <span className={styles.text}>{children}</span>
    </div>
  );
};
