import { Route, Routes } from 'react-router-dom';
import { HomePage, NotFound } from '@/pages';
import { AppLoaderLayout, MainLayout } from '@/app/layouts';
import { sections } from '@/shared/const/sections';

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

        {sections.map(({ id, tabs }) => (
          <Route key={id} path={`/${id}`} element={<NotFound />}>
            {Object.entries(tabs).map(([tab, path]) => {
              const relativePath = path.replace(`/${id}/`, '');
              return (
                <Route key={tab} path={relativePath} element={<NotFound />} />
              );
            })}
          </Route>
        ))}

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};
