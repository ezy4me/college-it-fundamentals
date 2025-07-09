import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import styles from './MainLayout.module.scss';
import { AppBar, Footer, Sidebar } from '@/widgets';

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.wrapper}>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      <div className={styles.main}>
        <AppBar />
        <div className={styles.contentWrapper}>
          <main className={styles.content}>
            <Outlet />
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
};
