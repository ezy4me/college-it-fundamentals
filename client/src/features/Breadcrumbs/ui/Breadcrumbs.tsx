import { Link, useLocation, useParams } from "react-router-dom";
import { sections, type SectionTab, type Section, type MaterialItem } from "@/shared/const/sections";
import styles from "./Breadcrumbs.module.scss";

interface Crumb {
  label: string;
  to: string;
}

export const Breadcrumbs = () => {
  const { id, tab, materialId } = useParams<{
    id?: string;
    tab?: SectionTab;
    materialId?: string;
  }>();
  const location = useLocation();

  const crumbs: Crumb[] = [];

  const section: Section | undefined = sections.find((s) => s.id === id);

  if (section) {
    crumbs.push({ label: section.title, to: `/${section.id}` });

    if (tab && section.tabs?.[tab]) {
      const tabLabelMap: Record<SectionTab, string> = {
        lectures: "Лекции",
        practices: "Практики",
        labs: "Лабораторные",
      };

      crumbs.push({
        label: tabLabelMap[tab] || tab,
        to: `/${section.id}/${tab}`,
      });

      const material: MaterialItem | undefined = section.content?.[tab]?.find(
        (m) => m.id === materialId
      );

      if (material) {
        crumbs.push({ label: material.title, to: location.pathname });
      }
    }
  }

  return (
    <nav className={styles.breadcrumbs}>
      {crumbs.map((crumb, index) => (
        <span key={crumb.to} className={styles.crumb}>
          <Link to={crumb.to}>{crumb.label}</Link>
          {index < crumbs.length - 1 && <span className={styles.separator}> /</span>}
        </span>
      ))}
    </nav>
  );
};
