import { useParams, NavLink, useLocation } from 'react-router-dom';
import { sections, type SectionTab, type MaterialItem } from '@/shared/const/sections';
import styles from './SubjectPage.module.scss';

export const SubjectPage = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  const section = sections.find((s) => s.id === id);

  if (!section) {
    return <div className={styles.notFound}>Предмет не найден</div>;
  }

  const activeTab = (location.pathname.split('/')[2] || '') as SectionTab;

  const materials: MaterialItem[] = section.content?.[activeTab] || [];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.icon}>{section.icon()}</div>
        <h1 className={styles.title}>{section.title}</h1>
      </header>

      <p className={styles.description}>
        Здесь вы найдёте лекции, практические и лабораторные работы по предмету{' '}
        <strong>{section.title}</strong>. Выберите нужный раздел ниже.
      </p>

      <nav className={styles.tabs}>
        {Object.entries(section.tabs).map(([tab, path]) => (
          <NavLink
            key={tab}
            to={path}
            className={({ isActive }) =>
              isActive ? `${styles.tab} ${styles.active}` : styles.tab
            }
          >
            {tab === 'lectures' && 'Лекции'}
            {tab === 'practices' && 'Практики'}
            {tab === 'labs' && 'Лабораторные'}
          </NavLink>
        ))}
      </nav>

      <section className={styles.materials}>
        {materials.length === 0 && (
          <p>В этом разделе пока нет материалов.</p>
        )}

        <ul>
          {materials.map((item, index) => (
            <li key={item.id} className={styles.materialItem}>
              <span className={styles.materialIndex}>{index + 1}.</span>{' '}
              {item.title}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};
