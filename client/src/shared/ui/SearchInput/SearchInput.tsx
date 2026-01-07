import { type ChangeEvent } from "react";

import styles from "./SearchInput.module.scss";

interface Props {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, placeholder, onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      className={styles.search}
      value={value}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
};
