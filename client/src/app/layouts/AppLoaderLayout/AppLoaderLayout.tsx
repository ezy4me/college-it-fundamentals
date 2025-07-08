import { useEffect, useState } from 'react';
import styles from './AppLoaderLayout.module.scss';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const AppLoaderLayout = ({ children }: Props) => {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      await new Promise((res) => setTimeout(res, 300));
      setAppReady(true);
    };

    init();
  }, []);

  if (!appReady) {
    return (
      <div className={styles.loaderWrapper}>
        <div className={styles.loaderBox}>
          <div className={styles.spinner}></div>
          <div className={styles.text}>Загрузка интерфейса...</div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
