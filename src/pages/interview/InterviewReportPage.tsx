/**
 * CareerLens AI — Interview Report Page
 *
 * Route: /interview/report
 * Visual Reference: Website Look/Interview Result.png
 *
 * Production-quality awaiting-evaluation state.
 * Truthfully communicates the report schema and question breakdown
 * without fabricated scores or fake performance percentages.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Clock,
  Code,
  Download,
  RotateCcw,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import { MascotCanvas } from '@/mascot';
import styles from './InterviewReportPage.module.css';

interface CategorySchema {
  label: string;
  desc: string;
}

const CATEGORY_SCHEMAS: CategorySchema[] = [
  { label: 'Technical Knowledge', desc: 'Core fundamentals, language syntax, and architectural concepts' },
  { label: 'Problem Solving & Logic', desc: 'Algorithmic efficiency, edge case handling, and analytical depth' },
  { label: 'System Design & Tradeoffs', desc: 'Scalability, component decoupling, and caching mechanisms' },
  { label: 'Communication & Delivery', desc: 'Clarity of thought, structural organization, and responsiveness' },
  { label: 'Behavioral & Situational', desc: 'Teamwork principles, leadership under pressure, and conflict resolution' },
];

const QUESTION_BREAKDOWN_SCHEMA = [
  {
    num: 1,
    topic: 'Candidate Introduction',
    difficulty: 'Easy',
    status: 'Pending Evaluation',
  },
  {
    num: 2,
    topic: 'SQL vs NoSQL Architecture',
    difficulty: 'Medium',
    status: 'Pending Evaluation',
  },
  {
    num: 3,
    topic: 'Distributed Caching Strategy',
    difficulty: 'Hard',
    status: 'Pending Evaluation',
  },
  {
    num: 4,
    topic: 'Microservices Communication',
    difficulty: 'Hard',
    status: 'Pending Evaluation',
  },
  {
    num: 5,
    topic: 'Handling Production Outages',
    difficulty: 'Medium',
    status: 'Pending Evaluation',
  },
];

export const InterviewReportPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      {/* ── Top Header Row ── */}
      <div className={styles.topHeaderRow}>
        <div className={styles.titleArea}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb navigation">
            <Link to={ROUTES.INTERVIEW_SETUP} className={styles.breadcrumbLink}>
              Mock Interview
            </Link>
            <span>&gt;</span>
            <span>Interview Report</span>
          </nav>
          <h1 className={styles.pageTitle}>
            Interview <span className={styles.headlineAccent}>Report</span>
          </h1>
          <p className={styles.pageSubtitle}>
            Comprehensive performance evaluation, question breakdowns, and targeted recommendations.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link to={ROUTES.INTERVIEW_SETUP} className={styles.actionSecondaryBtn}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>Start New Session</span>
          </Link>
          <button
            type="button"
            className={styles.actionSecondaryBtn}
            disabled
            style={{ opacity: 0.6, cursor: 'not-allowed' }}
            title="Download PDF is enabled once interview evaluation is generated"
            aria-disabled="true"
          >
            <Download size={14} aria-hidden="true" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* ── Session Context Strip ── */}
      <div className={styles.sessionContextStrip}>
        <div className={styles.contextItem}>
          <Briefcase size={16} className={styles.contextBadgeIcon} aria-hidden="true" />
          <span>
            <strong>Target Role:</strong> Software Engineer (Simulated)
          </span>
        </div>

        <div className={styles.contextItem}>
          <Clock size={16} className={styles.contextBadgeIcon} aria-hidden="true" />
          <span>
            <strong>Format:</strong> 10 Questions (~ 40 min)
          </span>
        </div>

        <div className={styles.contextItem}>
          <Code size={16} className={styles.contextBadgeIcon} aria-hidden="true" />
          <span>
            <strong>Focus:</strong> Technical Fundamentals &amp; Architecture
          </span>
        </div>

        {/* Mascot Footprint */}
        <div className={styles.mascotArea} aria-hidden="true">
          <div className={styles.mascotCanvasBox}>
            <MascotCanvas
              semanticState="ENCOURAGING"
              cameraPreset="compact"
              transparent
              showPlatform={false}
            />
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-secondary)' }}>
            Keep practicing!
          </span>
        </div>
      </div>

      {/* ── Status Notice ── */}
      <div className={styles.noticeBanner} role="status">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <Clock size={16} color="var(--color-primary)" aria-hidden="true" />
          <span>
            <strong>Report Awaiting Evaluation:</strong> Detailed performance scoring and
            question-by-question evaluations generate upon live session completion by the AI
            evaluation engine. The schema below outlines the full report structure.
          </span>
        </div>
        <Link to={ROUTES.INTERVIEW_SETUP} className={styles.breadcrumbLink}>
          <span>Configure Next Interview →</span>
        </Link>
      </div>

      {/* ── Section 1: Overall Performance & Categories (2 Columns) ── */}
      <div className={styles.overviewGrid}>
        {/* Left: Overall Performance Radial Placeholder */}
        <div className={styles.cardPanel}>
          <div className={styles.gaugeCardCenter}>
            <div className={styles.gaugeCircleWrapper} aria-hidden="true">
              <svg className={styles.gaugeSvg} viewBox="0 0 100 100">
                <circle className={styles.gaugeBg} cx="50" cy="50" r="45" />
              </svg>
              <div style={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span className={styles.gaugeScoreText}>--</span>
                <span className={styles.gaugeScoreTotal}>/ 100</span>
              </div>
            </div>

            <div>
              <h2 className={styles.panelTitle} style={{ fontSize: 'var(--font-size-sm)' }}>
                Overall Session Performance
              </h2>
              <span
                style={{
                  display: 'inline-block',
                  marginTop: '0.375rem',
                  padding: '0.25rem 0.75rem',
                  borderRadius: 'var(--radius-full)',
                  backgroundColor: 'var(--color-bg-subtle)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.6875rem',
                  fontWeight: 700,
                  color: 'var(--color-text-secondary)',
                }}
              >
                Awaiting Evaluation
              </span>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
              Calculated across technical depth, question clarity, and behavioral alignment.
            </p>
          </div>
        </div>

        {/* Right: Category-wise Score Breakdown Schema */}
        <div className={styles.cardPanel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 className={styles.panelTitle}>Category-wise Evaluation</h2>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Available after session
            </span>
          </div>

          <div className={styles.categoryList}>
            {CATEGORY_SCHEMAS.map((cat) => (
              <div key={cat.label} className={styles.categoryItem}>
                <div className={styles.categoryLabelRow}>
                  <span>{cat.label}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.6875rem' }}>
                    Pending
                  </span>
                </div>
                <div
                  className={styles.categoryBar}
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cat.label}: awaiting evaluation`}
                >
                  <div style={{ width: '0%', height: '100%', backgroundColor: 'var(--color-border)' }} />
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                  {cat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 2: Strengths, Areas for Improvement, AI Feedback (3 Columns) ── */}
      <section className={styles.threeColGrid} aria-label="Session evaluation areas">
        {/* Strengths Schema */}
        <div className={styles.cardPanel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 className={styles.panelTitle}>Identified Strengths</h3>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Pending
            </span>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            Highlights high-scoring conceptual responses and strong architectural explanations:
          </p>
          <ul className={styles.checklist}>
            <li className={styles.checklistItem}>
              <CheckCircle2 size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>Core technical concept grasp &amp; structured definitions</span>
            </li>
            <li className={styles.checklistItem}>
              <CheckCircle2 size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>Clarity of verbal thought process &amp; edge case anticipation</span>
            </li>
            <li className={styles.checklistItem}>
              <CheckCircle2 size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>Confidence and articulation in situational communication</span>
            </li>
          </ul>
        </div>

        {/* Areas for Improvement Schema */}
        <div className={styles.cardPanel}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 className={styles.panelTitle}>Areas to Strengthen</h3>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Pending
            </span>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            Identifies specific gaps where additional technical depth or conciseness is needed:
          </p>
          <ul className={styles.checklist}>
            <li className={styles.checklistItem}>
              <AlertTriangle size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>System design depth and scaling bottlenecks</span>
            </li>
            <li className={styles.checklistItem}>
              <AlertTriangle size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>Quantifying latency, throughput, and resource tradeoffs</span>
            </li>
            <li className={styles.checklistItem}>
              <AlertTriangle size={16} color="var(--color-warning)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>Direct conciseness in executive-level behavioral answers</span>
            </li>
          </ul>
        </div>

        {/* AI Feedback Summary */}
        <div className={styles.cardPanel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Sparkles size={18} color="var(--color-primary)" aria-hidden="true" />
            <h3 className={styles.panelTitle}>AI Evaluation Summary</h3>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            A personalized narrative summary of your simulation session will generate here,
            providing actionable study guidance and specific interview strategies.
          </p>
          <div
            style={{
              marginTop: 'auto',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-subtle)',
              border: '1px dashed var(--color-border)',
              textAlign: 'center',
            }}
          >
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              Summary generated after evaluated session.
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 3: Question-wise Breakdown Table Schema ── */}
      <div className={styles.tableCard}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 className={styles.panelTitle}>Question-wise Breakdown</h2>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            Awaiting session evaluation
          </span>
        </div>

        <table className={styles.reportTable} aria-label="Question performance breakdown table">
          <thead>
            <tr>
              <th style={{ width: '40px' }}>#</th>
              <th>Question Topic</th>
              <th>Difficulty</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {QUESTION_BREAKDOWN_SCHEMA.map((q) => (
              <tr key={q.num}>
                <td style={{ fontWeight: 700 }}>{q.num}</td>
                <td style={{ fontWeight: 600 }}>{q.topic}</td>
                <td>
                  <span
                    style={{
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-full)',
                      backgroundColor: 'var(--color-bg-subtle)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.6875rem',
                      fontWeight: 600,
                    }}
                  >
                    {q.difficulty}
                  </span>
                </td>
                <td style={{ color: 'var(--color-text-muted)', fontStyle: 'italic' }}>
                  {q.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ── Section 4: Next Steps & Learning Resources (2 Columns) ── */}
      <div className={styles.twoColGrid}>
        <div className={styles.cardPanel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Lightbulb size={18} color="var(--color-primary)" aria-hidden="true" />
            <h2 className={styles.panelTitle}>Suggested Next Actions</h2>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
            Continue practicing with varied role criteria to build interview stamina and refine
            structured thinking.
          </p>

          <Link to={ROUTES.INTERVIEW_SETUP} className={styles.startNewBtn}>
            <span>Start Another Mock Session</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>

        <div className={styles.cardPanel}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <BookOpen size={18} color="var(--color-primary)" aria-hidden="true" />
            <h2 className={styles.panelTitle}>Preparation Resources</h2>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
            Recommended technical roadmaps and practice modules in CareerLens AI:
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginTop: 'auto' }}>
            <Link
              to={ROUTES.SKILL_GAP}
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-primary)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Review Skill Gap Roadmap →
            </Link>
            <Link
              to={ROUTES.DASHBOARD}
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Return to Dashboard →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewReportPage;
