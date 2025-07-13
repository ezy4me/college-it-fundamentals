import { Route, Routes } from 'react-router-dom';
import { HomePage, NotFound, SubjectPage } from '@/pages';
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

        <Route path="/:id" element={<SubjectPage />}>
          <Route path="lectures" element={<NotFound />} />
          <Route path="practices" element={<NotFound />} />
          <Route path="labs" element={<NotFound />} />
          <Route index element={<NotFound />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
