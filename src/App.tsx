import React from 'react';
import { ThemeProvider } from '@/context/ThemeContext';
import { MascotProvider } from '@/mascot';
import { AppRouter } from '@/app/routes/AppRouter';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <MascotProvider defaultFloatingVisible={false}>
        <AppRouter />
      </MascotProvider>
    </ThemeProvider>
  );
};

export default App;
