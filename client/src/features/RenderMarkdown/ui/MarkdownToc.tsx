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
    <nav className={styles.tocWrapper}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles.toggleButton}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Скрыть оглавление" : "Показать оглавление"}>
        {isOpen ? <ChevronDown size={18} /> : <ChevronUp size={18} />}
      </button>

      <nav className={`${styles.toc} ${isOpen ? styles.open : styles.closed}`}>
        <ul>
          {headings.map(({ id, text, level }) => (
            <li key={id} style={{ marginLeft: (level - 1) * 16 }}>
              <a
                href={`#${id}`}
                title={text}
                onClick={(e) => handleClick(e, id)}>
                {truncate(text)}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </nav>
  );
};
