/**
 * CareerLens AI — Skill Gap Analysis Page
 *
 * Phase 5 Batch: Resume vs Target Job Comparison UI
 * Visual Reference: Website Look/Skill Gap.png
 *
 * Production-quality awaiting-processing and prerequisite workflow state.
 * Strictly communicates the comparison workflow without fabricated scores or fake percentages.
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ArrowRight,
  Lightbulb,
  Sparkles,
  RotateCcw,
  Clock,
  Layers,
  FileText,
  Briefcase,
  TrendingUp,
} from 'lucide-react';
import { MascotCanvas } from '@/mascot';
import { ROUTES } from '@/app/routes/routes';
import styles from './SkillGapPage.module.css';

interface BreakdownCategory {
  label: string;
  desc: string;
}

const BREAKDOWN_CATEGORIES: BreakdownCategory[] = [
  { label: 'Technical Competencies', desc: 'Programming languages, tools, and technical domain depth' },
  { label: 'Experience Depth', desc: 'Years in relevant roles, leadership, and operational scale' },
  { label: 'Projects & Implementations', desc: 'Architecture, production deployments, and tangible deliverables' },
  { label: 'Educational Background', desc: 'Degrees, certifications, and academic specialization' },
  { label: 'Job Responsibilities Fit', desc: 'Alignment with daily duties, team collaboration, and problem solving' },
];

const ROADMAP_PHASES = [
  {
    phase: 'Phase 1',
    title: 'Core Fundamentals & Terminology',
    desc: 'Review underlying theory, system models, and industry standards.',
  },
  {
    phase: 'Phase 2',
    title: 'Hands-on Implementation',
    desc: 'Build functional proofs-of-concept incorporating missing technologies.',
  },
  {
    phase: 'Phase 3',
    title: 'Portfolio & Resume Evidence',
    desc: 'Document architecture, design decisions, and measurable outcomes in your resume.',
  },
  {
    phase: 'Phase 4',
    title: 'AI Mock Interview Practice',
    desc: 'Simulate technical questions and system design scenarios for this specific role.',
  },
];

export const SkillGapPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      {/* ── Section 1: Hero Header Banner ── */}
      <section className={styles.heroBanner} aria-label="Skill Gap Overview">
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Skill Gap Analysis</span>
          <h1 className={styles.heroHeadline}>
            Skill Gap <span className={styles.headlineAccent}>Comparison</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Identify qualification alignment, missing evidence, and prioritized learning areas
            between your active resume and a target role.
          </p>

          {/* Target Role Box */}
          <div className={styles.targetRoleBox}>
            <div className={styles.roleLeft}>
              <div className={styles.roleIconBadge} aria-hidden="true">
                <Briefcase size={18} />
              </div>
              <div className={styles.roleDetails}>
                <h2 className={styles.roleTitle}>Software Engineer (Example Target Role)</h2>
                <span className={styles.roleCompany}>Configured via Job Match</span>
                <div className={styles.roleTags}>
                  <span>📍 Target Location</span>
                  <span>•</span>
                  <span>🕒 Experience Level</span>
                  <span>•</span>
                  <span>💼 Employment Type</span>
                </div>
              </div>
            </div>

            <Link to={ROUTES.JOB_MATCH} className={styles.changeRoleBtn}>
              <RotateCcw size={13} aria-hidden="true" />
              <span>Change Target Role</span>
            </Link>
          </div>
        </div>

        {/* Mascot Container */}
        <div className={styles.heroMascotArea} aria-hidden="true">
          <div className={styles.speechBubble}>
            Identify gaps. <span style={{ color: 'var(--color-primary)' }}>Learn faster!</span>
          </div>
          <div className={styles.mascotCanvasBox}>
            <MascotCanvas
              semanticState="ANALYZING"
              cameraPreset="compact"
              width="180px"
              height="180px"
              showPlatform={false}
              interactive={true}
              enableMouseOrbit={true}
            />
          </div>
        </div>
      </section>

      {/* ── Pending Notice / Prerequisites Card ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          padding: '0.875rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-primary)',
          flexWrap: 'wrap',
        }}
        role="status"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <Clock size={16} color="var(--color-primary)" aria-hidden="true" />
          <span>
            <strong>Awaiting Analysis:</strong> Skill gap comparison will generate once your active
            resume and target job description are processed by the matching engine.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link to={ROUTES.RESUME} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Resume Workspace →
          </Link>
          <Link to={ROUTES.JOB_MATCH} style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
            Job Match →
          </Link>
        </div>
      </div>

      {/* ── Section 2: Top Overview (Match Gauge + Breakdown) ── */}
      <div className={styles.overviewGrid}>
        {/* Left: Overall Match Radial Placeholder */}
        <div className={styles.cardPanel}>
          <div className={styles.matchGaugeCard}>
            <div className={styles.gaugeCircleWrapper} aria-hidden="true">
              <svg className={styles.gaugeSvg} viewBox="0 0 100 100">
                <circle className={styles.gaugeBg} cx="50" cy="50" r="45" />
              </svg>
              <span className={styles.gaugeScoreText} style={{ fontSize: '1.25rem' }}>--</span>
            </div>

            <div className={styles.gaugeMeta}>
              <span className={styles.gaugeLabel}>Role Match Readiness</span>
              <span className={styles.matchPill} style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
                Awaiting Comparison
              </span>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                Based on active resume vs job criteria
              </span>
            </div>
          </div>

          <div className={styles.matchCallout}>
            <p className={styles.calloutTitle} style={{ color: 'var(--color-text-primary)' }}>
              <Layers size={16} color="var(--color-primary)" aria-hidden="true" />
              <span>How Skill Gap Comparison Works</span>
            </p>
            <p className={styles.calloutBody}>
              CareerLens benchmarks your resume skills directly against the target job requirements.
              Missing skills indicate areas lacking direct evidence on your resume rather than an
              absolute absence of ability.
            </p>
          </div>
        </div>

        {/* Right: Requirement Breakdown Schema */}
        <div className={styles.cardPanel}>
          <div className={styles.panelHeader}>
            <h3 className={styles.panelTitle}>Requirement Breakdown</h3>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Available after analysis
            </span>
          </div>

          <div className={styles.breakdownList}>
            {BREAKDOWN_CATEGORIES.map((cat) => (
              <div key={cat.label} className={styles.breakdownItem}>
                <div className={styles.breakdownLabelRow}>
                  <span>{cat.label}</span>
                  <span style={{ color: 'var(--color-text-muted)', fontSize: '0.6875rem' }}>
                    Pending
                  </span>
                </div>
                <div
                  className={styles.breakdownBar}
                  role="progressbar"
                  aria-valuenow={0}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cat.label}: pending analysis`}
                >
                  <div
                    className={styles.breakdownFill}
                    style={{ width: '0%', backgroundColor: 'var(--color-border)' }}
                  />
                </div>
                <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)' }}>
                  {cat.desc}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Section 3: Middle 3-Column Skills Analysis Section ── */}
      <section aria-label="Skills Analysis Schema">
        <div className={styles.skillsAnalysisGrid}>
          {/* Matched Skills Schema */}
          <div className={styles.skillColCard}>
            <div className={styles.skillColHeader}>
              <h3 className={styles.skillColTitle}>Matched Skills</h3>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Awaiting Analysis
              </span>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Skills with clear evidence identified in your resume that directly satisfy target job
              requirements will appear here with confirmation tags.
            </p>
            <div style={{ padding: '1.25rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)', marginTop: 'auto' }}>
              <CheckCircle2 size={24} color="var(--color-text-muted)" style={{ margin: '0 auto 0.5rem auto' }} aria-hidden="true" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Matched competencies will list here
              </span>
            </div>
          </div>

          {/* Skills to Improve Schema */}
          <div className={styles.skillColCard}>
            <div className={styles.skillColHeader}>
              <h3 className={styles.skillColTitle}>Skills to Strengthen</h3>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Awaiting Analysis
              </span>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Skills mentioned in your profile that would benefit from more prominent evidence,
              deeper metrics, or dedicated project examples.
            </p>
            <div style={{ padding: '1.25rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)', marginTop: 'auto' }}>
              <AlertTriangle size={24} color="var(--color-text-muted)" style={{ margin: '0 auto 0.5rem auto' }} aria-hidden="true" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Strengthening targets will list here
              </span>
            </div>
          </div>

          {/* Missing Skills Schema */}
          <div className={styles.skillColCard}>
            <div className={styles.skillColHeader}>
              <h3 className={styles.skillColTitle}>Missing Competencies</h3>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Awaiting Analysis
              </span>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0, lineHeight: 1.4 }}>
              Essential qualifications mentioned in the job description that currently lack documented
              evidence on your active resume.
            </p>
            <div style={{ padding: '1.25rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)', marginTop: 'auto' }}>
              <XCircle size={24} color="var(--color-text-muted)" style={{ margin: '0 auto 0.5rem auto' }} aria-hidden="true" />
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                Evidence gaps will list here
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 4: Bottom Learning Path & Insights (2 Columns) ── */}
      <div className={styles.bottomTwoColGrid}>
        {/* Recommended Learning Path Schema */}
        <div className={styles.cardPanel}>
          <div className={styles.panelHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--color-primary)" aria-hidden="true" />
              <h3 className={styles.panelTitle}>Learning Roadmap Framework</h3>
            </div>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Structure
            </span>
          </div>

          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', margin: 0 }}>
            Once gaps are identified, CareerLens creates a 4-phase learning progression tailored to the role:
          </p>

          <div className={styles.pathList}>
            {ROADMAP_PHASES.map((item) => (
              <div key={item.phase} className={styles.pathItem}>
                <div className={styles.pathNumber} aria-hidden="true" style={{ fontSize: '0.6875rem' }}>
                  {item.phase.replace('Phase ', '')}
                </div>
                <div className={styles.pathText}>
                  <span className={styles.pathTitle}>{item.title}</span>
                  <span className={styles.pathDesc}>{item.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CareerLens Insights */}
        <div className={styles.cardPanel}>
          <div className={styles.panelHeader}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lightbulb size={18} color="var(--color-primary)" aria-hidden="true" />
              <h3 className={styles.panelTitle}>Skill Gap Principles</h3>
            </div>
          </div>

          <ul className={styles.insightsList}>
            <li className={styles.insightItem}>
              <TrendingUp size={16} className={styles.insightCheck} aria-hidden="true" />
              <span>Missing skills represent gaps in evidence, not necessarily gaps in personal ability.</span>
            </li>
            <li className={styles.insightItem}>
              <TrendingUp size={16} className={styles.insightCheck} aria-hidden="true" />
              <span>Gaps are prioritized by recurrence and prominence in the target job posting.</span>
            </li>
            <li className={styles.insightItem}>
              <TrendingUp size={16} className={styles.insightCheck} aria-hidden="true" />
              <span>Prioritized items feed directly into role-tailored AI mock interview questions.</span>
            </li>
            <li className={styles.insightItem}>
              <TrendingUp size={16} className={styles.insightCheck} aria-hidden="true" />
              <span>Closing 2–3 high-priority gaps significantly improves ATS relevance scores.</span>
            </li>
          </ul>

          <div className={styles.quoteBox}>
            &ldquo;Skills are the bridge between where you are today and where you want to be.&rdquo;
            <br />
            <strong style={{ color: 'var(--color-primary)' }}>— CareerLens AI</strong>
          </div>
        </div>
      </div>

      {/* ── Section 5: Next Action Banner ── */}
      <section className={styles.nextStepBanner} aria-label="Workflow navigation">
        <div className={styles.bannerLeft}>
          <div className={styles.bannerIcon} aria-hidden="true">
            <FileText size={24} />
          </div>
          <div>
            <h3 className={styles.bannerTitle}>Complete Comparison Prerequisites</h3>
            <p className={styles.bannerDesc}>
              Upload your active resume and select a target job description to prepare for automated
              skill-gap analysis.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link
            to={ROUTES.RESUME}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border)',
              backgroundColor: 'var(--color-surface)',
              color: 'var(--color-text-primary)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <span>Resume Workspace</span>
          </Link>
          <Link
            to={ROUTES.JOB_MATCH}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.625rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-primary-contrast)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 700,
              textDecoration: 'none',
            }}
          >
            <span>Go to Job Match</span>
            <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default SkillGapPage;
