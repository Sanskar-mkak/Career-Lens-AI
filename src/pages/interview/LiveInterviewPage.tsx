import React from 'react';

export const LiveInterviewPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '0.5rem' }}>Live Interview</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        Phase 1 Scaffolding — Interactive mock interview session to be implemented in Phase 2.
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
          Screen 09 — Live Interview
        </span>
      </div>
    </div>
  );
};

export default LiveInterviewPage;
