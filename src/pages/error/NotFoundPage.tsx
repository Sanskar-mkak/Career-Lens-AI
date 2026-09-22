import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routes';

export const NotFoundPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
        backgroundColor: 'var(--color-bg)',
      }}
    >
      <h1
        style={{
          fontSize: '4rem',
          fontWeight: 800,
          color: 'var(--color-primary)',
          lineHeight: 1,
          marginBottom: '1rem',
        }}
      >
        404
      </h1>
      <h2 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '0.75rem' }}>Page Not Found</h2>
      <p
        style={{
          maxWidth: '450px',
          color: 'var(--color-text-secondary)',
          marginBottom: '2rem',
        }}
      >
        Screen 14 — The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to={ROUTES.LANDING}
        style={{
          display: 'inline-block',
          padding: '0.75rem 1.5rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-primary)',
          color: 'var(--color-primary-contrast)',
          fontWeight: 600,
          fontSize: 'var(--font-size-sm)',
        }}
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
