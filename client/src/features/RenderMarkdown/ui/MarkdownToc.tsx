import { useCallback, useState } from "react";
import styles from "./MarkdownToc.module.scss";
import { type HeadingInfo } from "../lib/extractHeadings";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Props {
  headings: HeadingInfo[];
}

const truncate = (text: string, maxLength = 40) =>
  text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

export const MarkdownToc = ({ headings }: Props) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
      e.preventDefault();
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });

        if (history.pushState) {
          history.pushState(null, "", `#${id}`);
        } else {
          window.location.hash = id;
        }
      }
    },
    []
  );

  return (
    <aside className={styles.tocWrapper} aria-label="Оглавление">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleButton}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Скрыть оглавление" : "Показать оглавление"}>
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>

      <div className={`${styles.toc} ${isOpen ? styles.open : styles.closed}`}>
        <ul className={styles.tocList}>
          {headings.map(({ id, text, level }) => (
            <li
              key={id}
              className={styles.tocItem}
              style={{ paddingLeft: (level - 1) * 16 }}>
              <a
                href={`#${id}`}
                title={text}
                className={styles.tocLink}
                onClick={(e) => {
                  handleClick(e, id);
                  if (window.innerWidth <= 768) setIsOpen(false); // автоматически закрываем на мобилке
                }}>
                {truncate(text)}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};
