import { Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages';
import { AppLoaderLayout, MainLayout } from '@/app/layouts';

export const AppRouter = () => {
  return (
    <Routes>
      <Route
        element={
          <AppLoaderLayout>
            <MainLayout />
          </AppLoaderLayout>
        }
      >
        <Route path="/" element={<HomePage />} />
      </Route>

    </Routes>
  );
};
