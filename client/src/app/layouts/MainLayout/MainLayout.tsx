import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { AppBar, Footer, Sidebar, MobileSidebar } from "@/widgets";

import styles from "./MainLayout.module.scss";

export const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className={styles.wrapper}>
      {!isMobile && (
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />
      )}

      <div className={styles.main}>
        <AppBar onBurgerClick={() => setMobileSidebarOpen((prev) => !prev)} />
        {isMobile && (
          <MobileSidebar
            open={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen((prev) => !prev)}
          />
        )}
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
