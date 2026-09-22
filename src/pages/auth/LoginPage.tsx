import React from 'react';

export const LoginPage: React.FC = () => {
  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '0.5rem' }}>Login</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        Phase 1 Scaffolding — Authentication workflow to be implemented in Phase 2.
      </p>
      <div
        style={{
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)', fontWeight: 600 }}>
          Screen 02 — Authentication Entry
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
