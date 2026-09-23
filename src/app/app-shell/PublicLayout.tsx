import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';

export const PublicLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  // The Landing Page (Screen 01) coordinates its own approved 7-section layout (including Navbar & Footer)
  if (location.pathname === ROUTES.LANDING) {
    return <Outlet />;
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <Link
            to={ROUTES.LANDING}
            style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)' }}
          >
            CareerLens AI
          </Link>
          <nav style={{ display: 'flex', gap: '1rem', fontSize: 'var(--font-size-sm)' }}>
            <Link to={ROUTES.LANDING}>Home</Link>
            <Link to={ROUTES.LOGIN}>Login</Link>
            <Link to={ROUTES.REGISTER}>Register</Link>
            <Link to={ROUTES.DASHBOARD} style={{ color: 'var(--color-text-secondary)' }}>
              App Shell →
            </Link>
          </nav>
        </div>

        <button
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '2.25rem',
            height: '2.25rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border)',
            color: 'var(--color-text-primary)',
            backgroundColor: 'var(--color-bg-subtle)',
          }}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </header>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
