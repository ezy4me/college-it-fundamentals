import { Route, Routes } from 'react-router-dom';
import { HomePage, NotFound, SubjectPage } from '@/pages';
import { AppLoaderLayout, MainLayout } from '@/app/layouts';
import { LecturePage } from '@/pages/LecturePage';

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

        <Route path="/:id" element={<SubjectPage />} />
        <Route path="/:id/lectures" element={<SubjectPage />} />
        <Route path="/:id/practices" element={<SubjectPage />} />
        <Route path="/:id/labs" element={<SubjectPage />} />

        <Route path="/:id/:tab/:materialId" element={<LecturePage />} />
        <Route path="/:id/:tab/:materialId" element={<LecturePage />} />
        <Route path="/:id/:tab/:materialId" element={<LecturePage />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
