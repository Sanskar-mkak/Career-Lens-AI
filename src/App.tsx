import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { AppRouter } from '@/app/routes/AppRouter';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  );
};

export default App;
