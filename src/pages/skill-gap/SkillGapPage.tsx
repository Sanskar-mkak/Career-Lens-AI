import React from 'react';

export const SkillGapPage: React.FC = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '0.5rem' }}>Skill Gap</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        Phase 1 Scaffolding — Resume vs Job skill-gap comparison to be implemented in Phase 2.
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
          Screen 07 — Skill Gap
        </span>
      </div>
    </div>
  );
};

export default SkillGapPage;
