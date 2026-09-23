<<<<<<< HEAD
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
=======
import AppShell from './layout/AppShell'
import './App.css'
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  return (
    <AppShell>
      <div className="page-placeholder">
        <p className="eyebrow">
          CAREERLENS AI
        </p>

        <h1>
          Your Career Journey,
          <br />
          Powered by <span>AI.</span>
        </h1>

        <p>
          Your CareerLens dashboard will live here.
        </p>
      </div>
      <Dashboard />
    </AppShell>
  )
}

export default App
>>>>>>> c8404c9 (feat : authentication window implementation)
