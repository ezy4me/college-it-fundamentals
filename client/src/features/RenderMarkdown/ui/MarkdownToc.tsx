import { ChevronDown, ChevronUp } from "lucide-react";
import { useCallback, useState, useEffect, useRef } from "react";

import { type HeadingInfo } from "../lib/extractHeadings";

import styles from "./MarkdownToc.module.scss";

interface Props {
  headings: HeadingInfo[];
}

const truncate = (text: string, maxLength = 40) =>
  text.length > maxLength ? text.slice(0, maxLength) + "…" : text;

export const MarkdownToc = ({ headings }: Props) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeId, setActiveId] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

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
        
        setActiveId(id);
      }
    },
    []
  );

  useEffect(() => {
    if (headings.length === 0) return;

    const options = {
      rootMargin: "-20% 0px -20% 0px", 
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    }, options);

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [headings]);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash && headings.some(h => h.id === hash)) {
        setActiveId(hash);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    
    const initialHash = window.location.hash.slice(1);
    if (initialHash && headings.some(h => h.id === initialHash)) {
      setActiveId(initialHash);
    }

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, [headings]);

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
              className={`${styles.tocItem} ${activeId === id ? styles.active : ''}`}
              style={{ fontWeight: level < 3 ? 'bold' : 'inherit' }}>
              <a 
                href={`#${id}`}
                title={text}
                className={styles.tocLink}
                onClick={(e) => {
                  handleClick(e, id);
                  if (window.innerWidth <= 768) setIsOpen(false); 
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