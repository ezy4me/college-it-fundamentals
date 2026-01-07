import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from '@/app/routing';
import { ThemeProvider } from '@/shared/lib/context/ThemeProvider';

export const App = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};
