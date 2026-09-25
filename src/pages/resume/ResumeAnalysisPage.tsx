/**
 * CareerLens AI — Resume Analysis Page
 *
 * Phase 5 Batch: Resume Analysis Results UI
 * Visual Reference: Website Look/Resume Analysis.png
 *
 * Production-quality awaiting-processing state.
 * Strictly communicates future analysis schema without fabricated scores or fake user metrics.
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FileText,
  User,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Target,
  ArrowRight,
  Download,
  RotateCcw,
  Sparkles,
  Lightbulb,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { MascotCanvas } from '@/mascot';
import { ROUTES } from '@/app/routes/routes';
import styles from './ResumeAnalysisPage.module.css';

interface SectionSchema {
  id: string;
  name: string;
  icon: React.ReactNode;
  description: string;
}

const SECTION_SCHEMAS: SectionSchema[] = [
  {
    id: 'contact',
    name: 'Contact Information',
    icon: <FileText size={16} />,
    description: 'Evaluates phone, email, location, and professional links.',
  },
  {
    id: 'summary',
    name: 'Professional Summary',
    icon: <User size={16} />,
    description: 'Evaluates executive positioning, clarity, and role targeting.',
  },
  {
    id: 'education',
    name: 'Education & Credentials',
    icon: <GraduationCap size={16} />,
    description: 'Evaluates degrees, institutions, graduation dates, and honors.',
  },
  {
    id: 'experience',
    name: 'Work Experience',
    icon: <Briefcase size={16} />,
    description: 'Evaluates role progression, quantified accomplishments, and KPIs.',
  },
  {
    id: 'projects',
    name: 'Technical Projects',
    icon: <FolderKanban size={16} />,
    description: 'Evaluates project complexity, technology stack, and repository links.',
  },
  {
    id: 'skills',
    name: 'Core Competencies',
    icon: <Target size={16} />,
    description: 'Evaluates grouped programming languages, frameworks, and tools.',
  },
];

const PLANNED_STRENGTH_CHECKS = [
  'Document layout, visual hierarchy, and section ordering',
  'Technical skill categorization and readability',
  'Quantifiable impact and business outcome measurement',
  'Formatting integrity across PDF and DOCX parsers',
];

const PLANNED_IMPROVEMENT_CHECKS = [
  'Action verb strength at the beginning of bullet points',
  'Keyword alignment against in-demand industry job descriptions',
  'Consistency in date formats and employment timelines',
  'Conciseness and removal of passive phrasing',
];

export const ResumeAnalysisPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.pageContainer}>
      {/* ── Top Header & Breadcrumbs ── */}
      <div className={styles.topHeaderRow}>
        <div className={styles.titleArea}>
          <nav className={styles.breadcrumbs} aria-label="Breadcrumb navigation">
            <Link to={ROUTES.RESUME} className={styles.breadcrumbLink}>
              Resume Workspace
            </Link>
            <span>&gt;</span>
            <span>Analysis Results</span>
          </nav>
          <h1 className={styles.pageTitle}>Resume Analysis</h1>
          <p className={styles.pageSubtitle}>
            Comprehensive evaluation of document structure, keyword coverage, and ATS readiness.
          </p>
        </div>

        <div className={styles.headerActions}>
          <Link to={ROUTES.RESUME} className={styles.actionSecondaryBtn}>
            <RotateCcw size={14} aria-hidden="true" />
            <span>Upload / Replace Resume</span>
          </Link>
          <button
            type="button"
            className={styles.actionSecondaryBtn}
            disabled
            style={{ opacity: 0.6, cursor: 'not-allowed' }}
            title="Report download is enabled once resume analysis is generated"
            aria-disabled="true"
          >
            <Download size={14} aria-hidden="true" />
            <span>Download Report</span>
          </button>
        </div>
      </div>

      {/* ── Pending Analysis Status Notice ── */}
      <div className={styles.demoNoticeBanner} role="status">
        <div className={styles.demoNoticeText}>
          <Clock size={16} color="var(--color-primary)" aria-hidden="true" />
          <span>
            <strong>Awaiting Analysis:</strong> Your resume analysis will appear here after your
            resume is processed by the CareerLens intelligence engine. The sections below outline
            the full evaluation report structure.
          </span>
        </div>
        <Link to={ROUTES.RESUME} className={styles.breadcrumbLink}>
          <span>Go to Resume Workspace →</span>
        </Link>
      </div>

      {/* ── Section 1: Hero Score Card & Banner (Pending State) ── */}
      <section className={styles.scoreBanner} aria-label="Overall Resume Quality Status">
        {/* Left: Overall Score Radial Placeholder */}
        <div className={styles.scoreGaugeCard}>
          <div className={styles.gaugeCircleWrapper} aria-hidden="true">
            <svg className={styles.gaugeSvg} viewBox="0 0 100 100">
              <circle className={styles.gaugeBg} cx="50" cy="50" r="45" />
            </svg>
            <div className={styles.gaugeScoreText}>
              <span className={styles.gaugeScoreNumber} style={{ fontSize: '1.25rem' }}>--</span>
              <span className={styles.gaugeScoreTotal}>/ 100</span>
            </div>
          </div>

          <div className={styles.scoreDetails}>
            <span className={styles.scoreLabel}>Overall Resume Quality</span>
            <span className={styles.scoreStatusPill} style={{ backgroundColor: 'var(--color-bg-subtle)', color: 'var(--color-text-secondary)', border: '1px solid var(--color-border)' }}>
              Awaiting Analysis
            </span>
          </div>
        </div>

        {/* Right: Insight Banner with Mascot */}
        <div className={styles.insightBannerRight}>
          <div className={styles.insightBannerText}>
            <h2 className={styles.insightHeadline}>Analysis Awaiting Processing</h2>
            <p className={styles.insightBody}>
              Once processed, CareerLens AI will benchmark your resume against industry ATS
              standards, highlight structural strengths, identify missing keywords, and suggest
              high-impact improvements.
            </p>
            <Link to={ROUTES.RESUME} className={styles.viewPlanBtn}>
              <span>Manage Resume in Workspace</span>
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>

          {/* Mascot Footprint */}
          <div className={styles.mascotArea} aria-hidden="true">
            <div className={styles.mascotSpeech}>
              Ready for your <span style={{ color: 'var(--color-primary)' }}>analysis!</span>
            </div>
            <div className={styles.mascotCanvasBox}>
              <MascotCanvas
                semanticState="PRESENTING"
                cameraPreset="compact"
                width="100%"
                height="100%"
                showPlatform={false}
                interactive={true}
                enableMouseOrbit={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 2: Section-wise Analysis Grid (6 Cards) ── */}
      <section aria-label="Section-by-section breakdown">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h2 className={styles.sectionTitle}>Section Analysis</h2>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            Available after processing
          </span>
        </div>

        <div className={styles.sectionGrid}>
          {SECTION_SCHEMAS.map((section) => (
            <div key={section.id} className={styles.sectionCard}>
              <div className={styles.sectionCardHeader}>
                <div className={styles.sectionIconTitle}>
                  <div className={styles.sectionIconWrapper} aria-hidden="true">
                    {section.icon}
                  </div>
                  <span className={styles.sectionName}>{section.name}</span>
                </div>
                <div className={styles.sectionScoreBadge}>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                    Pending
                  </span>
                </div>
              </div>

              <div
                className={styles.sectionProgressBar}
                role="progressbar"
                aria-valuenow={0}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${section.name}: awaiting analysis`}
              >
                <div
                  className={styles.sectionProgressFill}
                  style={{ width: '0%', backgroundColor: 'var(--color-border)' }}
                />
              </div>

              <p className={styles.sectionStatusText}>{section.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Section 3: Strengths, Areas for Improvement, ATS Analysis (3 Columns) ── */}
      <section className={styles.threeColGrid} aria-label="Detailed findings schema">
        {/* Strengths Schema */}
        <div className={styles.colCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 className={styles.colHeaderTitle}>Strengths</h3>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Awaiting Analysis
            </span>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            The analysis engine will identify standout sections, formatting highlights, and strong competencies:
          </p>
          <ul className={styles.itemChecklist}>
            {PLANNED_STRENGTH_CHECKS.map((item, idx) => (
              <li key={idx} className={styles.checklistItem}>
                <ShieldCheck size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Areas for Improvement Schema */}
        <div className={styles.colCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 className={styles.colHeaderTitle}>Areas for Improvement</h3>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Awaiting Analysis
            </span>
          </div>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            Targeted recommendations will flag areas where additional evidence or phrasing strengthens impact:
          </p>
          <ul className={styles.itemChecklist}>
            {PLANNED_IMPROVEMENT_CHECKS.map((item, idx) => (
              <li key={idx} className={styles.checklistItem}>
                <Lightbulb size={16} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ATS Compatibility Schema */}
        <div className={styles.colCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 className={styles.colHeaderTitle}>ATS Compatibility</h3>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Awaiting Analysis
            </span>
          </div>
          <div className={styles.atsCenter}>
            <div className={styles.atsGaugeWrapper} aria-hidden="true">
              <svg className={styles.gaugeSvg} viewBox="0 0 100 100">
                <circle className={styles.gaugeBg} cx="50" cy="50" r="42" />
              </svg>
              <span className={styles.atsScoreText} style={{ fontSize: '1.125rem' }}>--</span>
            </div>

            <p className={styles.atsLabel}>Parser Compatibility</p>
            <p className={styles.atsDesc}>
              Parsing checks verify header tags, font encoding, and table layouts for compatibility
              with enterprise applicant tracking systems.
            </p>
          </div>

          <button
            type="button"
            className={styles.atsDetailsBtn}
            onClick={() => navigate(ROUTES.JOB_MATCH)}
          >
            <span>Proceed to Job Match</span>
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* ── Section 4: Missing Keywords & AI Suggestions (2 Columns) ── */}
      <section className={styles.twoColGrid} aria-label="Keywords and suggestions schema">
        {/* Keywords Area */}
        <div className={styles.colCard}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className={styles.colHeaderTitle}>Target Role Keywords</h3>
              <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
                Awaiting Analysis
              </span>
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: '0.25rem 0 0 0' }}>
              Missing and matched industry keywords will be extracted when benchmarked against your target job.
            </p>
          </div>

          <div style={{ padding: '1.5rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              Keyword coverage will populate after a job description is matched.
            </span>
          </div>
        </div>

        {/* Suggestions Area */}
        <div className={styles.colCard}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sparkles size={18} color="var(--color-primary)" aria-hidden="true" />
              <h3 className={styles.colHeaderTitle}>Recommended Actions</h3>
            </div>
            <span style={{ fontSize: '0.6875rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>
              Awaiting Analysis
            </span>
          </div>

          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', margin: 0 }}>
            Actionable sentence rewrites and quantifiable bullet suggestions will appear here:
          </p>

          <div style={{ padding: '1.5rem', border: '1px dashed var(--color-border)', borderRadius: 'var(--radius-md)', textAlign: 'center', backgroundColor: 'var(--color-bg-subtle)' }}>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
              Personalized action recommendations will be generated based on parsed results.
            </span>
          </div>
        </div>
      </section>

      {/* ── Section 5: Bottom Callout Banner ── */}
      <section className={styles.bottomCtaBanner} aria-label="Next step in workflow">
        <div className={styles.bottomCtaLeft}>
          <div className={styles.bottomCtaIcon} aria-hidden="true">
            <Lightbulb size={24} />
          </div>
          <div>
            <h3 className={styles.bottomCtaTitle}>Next Step: Job Match Comparison</h3>
            <p className={styles.bottomCtaDesc}>
              Pair your resume with a specific job description to define the comparison criteria for
              skill-gap analysis.
            </p>
          </div>
        </div>

        <Link
          to={ROUTES.JOB_MATCH}
          className={styles.actionPrimaryBtn}
          style={{ padding: '0.75rem 1.5rem', fontSize: 'var(--font-size-sm)' }}
        >
          <span>Go to Job Match</span>
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      </section>
    </div>
  );
};

export default ResumeAnalysisPage;
