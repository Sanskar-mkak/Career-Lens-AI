import React from 'react';

export const LandingPage: React.FC = () => {
  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '0.5rem' }}>Landing Page</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        Phase 1 Scaffolding — Full public landing experience to be implemented in Phase 2.
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
          Screen 01 — Public Entry
        </span>
      </div>
    </div>
  );
};

export default LandingPage;
