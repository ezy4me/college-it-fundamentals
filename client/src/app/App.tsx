import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@/app/routing';

export const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
};
