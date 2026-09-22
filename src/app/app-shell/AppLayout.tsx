import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';

const NAV_LINKS = [
  { label: 'Dashboard', path: ROUTES.DASHBOARD },
  { label: 'Resume', path: ROUTES.RESUME },
  { label: 'Resume Analysis', path: ROUTES.RESUME_ANALYSIS },
  { label: 'Job Match', path: ROUTES.JOB_MATCH },
  { label: 'Skill Gap', path: ROUTES.SKILL_GAP },
  { label: 'Interview Setup', path: ROUTES.INTERVIEW_SETUP },
  { label: 'Live Interview', path: ROUTES.INTERVIEW_LIVE },
  { label: 'Interview Report', path: ROUTES.INTERVIEW_REPORT },
  { label: 'Applications', path: ROUTES.APPLICATIONS },
  { label: 'Profile', path: ROUTES.PROFILE },
  { label: 'Settings', path: ROUTES.SETTINGS },
];

export const AppLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.875rem 2rem',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link
            to={ROUTES.DASHBOARD}
            style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)' }}
          >
            CareerLens AI
          </Link>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            App Shell Scaffolding
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to={ROUTES.LANDING}
            style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}
          >
            Public Site ←
          </Link>
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
        </div>
      </header>

      {/* Navigation Bar for verifying routes */}
      <nav
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.5rem 2rem',
          borderBottom: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-bg-subtle)',
          overflowX: 'auto',
          fontSize: 'var(--font-size-xs)',
        }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '0.375rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                whiteSpace: 'nowrap',
                backgroundColor: isActive ? 'var(--color-surface)' : 'transparent',
                color: isActive ? 'var(--color-primary)' : 'var(--color-text-secondary)',
                fontWeight: isActive ? 600 : 400,
                border: isActive ? '1px solid var(--color-border)' : '1px solid transparent',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>

      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};
