import { useState, useMemo, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { sections, type SectionTab } from "@/shared/const/sections";
import styles from "./HomePage.module.scss";

const tabLabels: Record<SectionTab, string> = {
  lectures: "Лекции",
  practices: "Практики",
  labs: "Лаб. работы",
};

export const HomePage = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const searchResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowerQuery = query.toLowerCase();

    const results: {
      sectionId: string;
      sectionTitle: string;
      tab: SectionTab;
      materialId: string;
      materialTitle: string;
    }[] = [];

    sections.forEach((section) => {
      (["lectures", "practices", "labs"] as SectionTab[]).forEach((tab) => {
        const materials = section.content[tab];
        if (!materials) return;

        materials.forEach((material) => {
          if (
            section.title.toLowerCase().includes(lowerQuery) ||
            material.title.toLowerCase().includes(lowerQuery) ||
            tabLabels[tab].toLowerCase().includes(lowerQuery)
          ) {
            results.push({
              sectionId: section.id,
              sectionTitle: section.title,
              tab,
              materialId: material.id,
              materialTitle: material.title,
            });
          }
        });
      });
    });

    return results;
  }, [query]);

  const handleClick = (sectionId: string, tab: SectionTab, materialId: string) => {
    navigate(`/${sectionId}/${tab}/${materialId}`);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Добро пожаловать!</h1>
      <p className={styles.subtitle}>Ищите лекции, практики и лабораторные работы по предметам</p>

      <div className={styles.search}>
        <input
          type="text"
          placeholder="Поиск по предметам, лекциям, практикам..."
          className={styles.searchInput}
          value={query}
          onChange={handleChange}
        />
      </div>

      <div className={styles.results}>
        {searchResults.length > 0 ? (
          searchResults.map((item) => (
            <div
              key={`${item.sectionId}-${item.tab}-${item.materialId}`}
              className={styles.resultItem}
              onClick={() => handleClick(item.sectionId, item.tab, item.materialId)}
            >
              <div className={styles.resultSection}>{item.sectionTitle}</div>
              <div className={styles.resultTab}>{tabLabels[item.tab]}</div>
              <div className={styles.resultTitle}>{item.materialTitle}</div>
            </div>
          ))
        ) : (
          <div className={styles.noResults}>Ничего не найдено</div>
        )}
      </div>
    </div>
  );
};
