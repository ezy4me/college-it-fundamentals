import { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./SectionAccordion.module.scss";
import type { Section, SectionTab } from "@/shared/const/sections";

const tabLabels: Record<SectionTab, string> = {
  lectures: "Лекции",
  practices: "Практики",
  labs: "Лаб. работы",
};

interface Props {
  section: Section;
  searchQuery: string;
}

export const SectionAccordion = ({ section, searchQuery }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const filteredContent: Partial<Record<SectionTab, typeof section.content[SectionTab]>> = {};
  (Object.keys(section.content) as SectionTab[]).forEach(tab => {
    filteredContent[tab] = section.content[tab]?.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const hasResults = Object.values(filteredContent).some(items => items && items.length > 0);

  if (!hasResults) return null;

  return (
    <div className={styles.sectionCard}>
      <div className={styles.sectionHeader} onClick={toggle}>
        <span className={styles.icon}>{section.icon()}</span>
        <h2 className={styles.sectionTitle}>{section.title}</h2>
        <span className={styles.expandIndicator}>{isOpen ? "−" : "+"}</span>
      </div>

      {isOpen && (
        <div className={styles.tabs}>
          {(Object.keys(filteredContent) as SectionTab[]).map(tab => {
            const items = filteredContent[tab] || [];
            return (
              <div key={tab} className={styles.tabBlock}>
                <h3 className={styles.tabTitle}>
                  {tabLabels[tab]} ({items.length})
                </h3>
                <ul className={styles.materialList}>
                  {items.map(item => (
                    <li key={item.id} className={styles.materialItem}>
                      <NavLink to={`/${section.id}/${tab}/${item.id}`}>{item.title}</NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
