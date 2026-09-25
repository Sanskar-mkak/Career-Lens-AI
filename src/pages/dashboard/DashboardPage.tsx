/**
 * CareerLens AI — Dashboard Page
 *
 * Phase 4: Frontend Dashboard UI
 * Authenticated application central workspace representing an initial user state.
 * Strictly uses client-side presentation; no fabricated analytics or fake backend metrics.
 *
 * Visual Reference: Website Look/Dashboard.png
 */

import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Briefcase,
  Target,
  Mic,
  FolderKanban,
  ArrowRight,
  Clock,
  Circle,
  Compass,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { MascotCanvas } from '@/mascot';
import { ROUTES } from '@/app/routes/routes';
import styles from './DashboardPage.module.css';

/* ------------------------------------------------------------------ */
/* Static Data: Initial User State Overview Cards                     */
/* ------------------------------------------------------------------ */

interface StatusCardData {
  id: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  tag: string;
  actionText: string;
  link: string;
}

const INITIAL_STATUS_CARDS: StatusCardData[] = [
  {
    id: 'resume',
    icon: <FileText size={20} />,
    label: 'Resume Status',
    value: 'Not Uploaded',
    tag: 'Step 1',
    actionText: 'Upload resume to begin',
    link: ROUTES.RESUME,
  },
  {
    id: 'job-match',
    icon: <Briefcase size={20} />,
    label: 'Target Job',
    value: 'None Selected',
    tag: 'Step 2',
    actionText: 'Analyze a job description',
    link: ROUTES.JOB_MATCH,
  },
  {
    id: 'interview',
    icon: <Mic size={20} />,
    label: 'Practice Sessions',
    value: '0 Completed',
    tag: 'Step 3',
    actionText: 'Start a practice interview',
    link: ROUTES.INTERVIEW_SETUP,
  },
  {
    id: 'applications',
    icon: <FolderKanban size={20} />,
    label: 'Applications',
    value: '0 Tracked',
    tag: 'Step 4',
    actionText: 'Track your first job',
    link: ROUTES.APPLICATIONS,
  },
];

/* ------------------------------------------------------------------ */
/* Static Data: Career Workflow Steps                                 */
/* ------------------------------------------------------------------ */

interface WorkflowStep {
  step: number;
  title: string;
  desc: string;
  link: string;
}

const CAREER_WORKFLOW: WorkflowStep[] = [
  {
    step: 1,
    title: 'Resume Intelligence',
    desc: 'Upload and parse your resume with structural AI insights.',
    link: ROUTES.RESUME,
  },
  {
    step: 2,
    title: 'Job Match Comparison',
    desc: 'Compare your profile against specific job descriptions.',
    link: ROUTES.JOB_MATCH,
  },
  {
    step: 3,
    title: 'Skill Gap Analysis',
    desc: 'Identify critical missing competencies and learning areas.',
    link: ROUTES.SKILL_GAP,
  },
  {
    step: 4,
    title: 'AI Mock Interviews',
    desc: 'Practice technical & behavioral questions in real-time.',
    link: ROUTES.INTERVIEW_SETUP,
  },
  {
    step: 5,
    title: 'Application Tracking',
    desc: 'Organize your submissions, interviews, and offers in one pipeline.',
    link: ROUTES.APPLICATIONS,
  },
];

/* ------------------------------------------------------------------ */
/* Static Data: Onboarding Milestones Checklist                       */
/* ------------------------------------------------------------------ */

interface MilestoneItem {
  id: string;
  text: string;
  link: string;
}

const ONBOARDING_MILESTONES: MilestoneItem[] = [
  {
    id: 'm1',
    text: 'Upload master resume for structural analysis',
    link: ROUTES.RESUME,
  },
  {
    id: 'm2',
    text: 'Set your target role or paste a job posting',
    link: ROUTES.JOB_MATCH,
  },
  {
    id: 'm3',
    text: 'Review identified skill gaps and study topics',
    link: ROUTES.SKILL_GAP,
  },
  {
    id: 'm4',
    text: 'Complete a baseline 10-minute mock interview',
    link: ROUTES.INTERVIEW_SETUP,
  },
  {
    id: 'm5',
    text: 'Log your first company application in the tracker',
    link: ROUTES.APPLICATIONS,
  },
];

/* ------------------------------------------------------------------ */
/* Static Data: Recommended Quick Action Cards                        */
/* ------------------------------------------------------------------ */

interface QuickAction {
  id: string;
  icon: React.ReactNode;
  title: string;
  desc: string;
  link: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'resume-tool',
    icon: <FileText size={20} />,
    title: 'Improve Resume',
    desc: 'Upload and evaluate formatting, phrasing, and keyword clarity.',
    link: ROUTES.RESUME,
  },
  {
    id: 'interview-tool',
    icon: <Mic size={20} />,
    title: 'Practice Interview',
    desc: 'Simulate realistic role-specific questions with AI feedback.',
    link: ROUTES.INTERVIEW_SETUP,
  },
  {
    id: 'job-tool',
    icon: <Briefcase size={20} />,
    title: 'Explore Job Match',
    desc: 'Compare candidate qualifications against real job descriptions.',
    link: ROUTES.JOB_MATCH,
  },
  {
    id: 'skills-tool',
    icon: <Target size={20} />,
    title: 'Identify Skill Gaps',
    desc: 'Pinpoint required technologies and competencies to focus on.',
    link: ROUTES.SKILL_GAP,
  },
];

/* ------------------------------------------------------------------ */
/* DashboardPage Component                                            */
/* ------------------------------------------------------------------ */

export const DashboardPage: React.FC = () => {
  return (
    <div className={styles.dashboardContainer}>
      {/* ── Section 1: Hero Welcome Banner ── */}
      <section className={styles.heroBanner} aria-label="Welcome banner">
        <div className={styles.heroContent}>
          <div className={styles.heroGreeting}>
            <span>Welcome back</span>
            <span role="img" aria-label="waving hand">👋</span>
          </div>
          <h1 className={styles.heroHeadline}>
            Let&rsquo;s build a <span className={styles.headlineAccent}>better you</span> today.
          </h1>
          <p className={styles.heroSubtitle}>
            Small steps. Big opportunities. Start by building your career foundation below.
          </p>
        </div>

        {/* Mascot Container (Visual footprint matching Dashboard.png) */}
        <div className={styles.heroMascotArea} aria-hidden="true">
          <div className={styles.speechBubble}>
            Stay consistent! <span className={styles.speechBubbleText}>You&rsquo;re doing great.</span>
          </div>
          <div className={styles.mascotCanvasBox}>
            <MascotCanvas
              semanticState="IDLE"
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

      {/* ── Section 2: Initial User Status Cards (4 Columns) ── */}
      <section aria-label="Initial status overview">
        <div className={styles.statusGrid}>
          {INITIAL_STATUS_CARDS.map((card) => (
            <Link
              key={card.id}
              to={card.link}
              className={styles.statusCard}
              aria-label={`${card.label}: ${card.value}. ${card.actionText}`}
            >
              <div className={styles.statusCardTop}>
                <div className={styles.statusIconWrapper} aria-hidden="true">
                  {card.icon}
                </div>
                <span className={styles.statusTag}>{card.tag}</span>
              </div>
              <div className={styles.statusInfo}>
                <span className={styles.statusLabel}>{card.label}</span>
                <span className={styles.statusValue}>{card.value}</span>
              </div>
              <div className={styles.statusActionRow} aria-hidden="true">
                <span>{card.actionText}</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── Section 3: Career Workflow & Recommended Milestones (2 Columns) ── */}
      <section className={styles.twoColumnGrid} aria-label="Preparation workflow and milestones">
        {/* Left: Career Workflow Section */}
        <div className={styles.cardPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Career Preparation Workflow</h2>
              <p className={styles.panelSubtitle}>
                Follow the end-to-end CareerLens AI preparation journey:
              </p>
            </div>
            <Compass size={20} color="var(--color-primary)" aria-hidden="true" />
          </div>

          <div className={styles.workflowList} role="list">
            {CAREER_WORKFLOW.map((item) => (
              <Link
                key={item.step}
                to={item.link}
                className={styles.workflowItem}
                role="listitem"
                aria-label={`Step ${item.step}: ${item.title}. ${item.desc}`}
              >
                <div className={styles.workflowLeft}>
                  <div className={styles.stepNumber} aria-hidden="true">
                    {item.step}
                  </div>
                  <div className={styles.workflowDetails}>
                    <span className={styles.workflowTitle}>{item.title}</span>
                    <span className={styles.workflowDesc}>{item.desc}</span>
                  </div>
                </div>
                <div className={styles.workflowArrow} aria-hidden="true">
                  <ArrowRight size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right: Onboarding Milestones Checklist */}
        <div className={styles.cardPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Onboarding Milestones</h2>
              <p className={styles.panelSubtitle}>
                Essential initial actions to set up your profile:
              </p>
            </div>
            <CheckCircle2 size={20} color="var(--color-primary)" aria-hidden="true" />
          </div>

          <div className={styles.milestoneList} role="list">
            {ONBOARDING_MILESTONES.map((milestone) => (
              <Link
                key={milestone.id}
                to={milestone.link}
                className={styles.milestoneItem}
                role="listitem"
              >
                <div className={styles.milestoneCircle} aria-hidden="true">
                  <Circle size={10} color="var(--color-text-muted)" />
                </div>
                <span className={styles.milestoneText}>{milestone.text}</span>
                <span className={styles.milestoneAction} aria-hidden="true">
                  Start <ArrowRight size={12} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Recent Activity & Recommended Next Action (2 Columns) ── */}
      <section className={styles.activityGrid} aria-label="Activity and recommended next action">
        {/* Left: Recent Activity (Clean Empty State) */}
        <div className={styles.cardPanel}>
          <div className={styles.panelHeader}>
            <div>
              <h2 className={styles.panelTitle}>Recent Activity</h2>
              <p className={styles.panelSubtitle}>
                Your platform engagements and progress timeline
              </p>
            </div>
            <Clock size={20} color="var(--color-text-muted)" aria-hidden="true" />
          </div>

          <div className={styles.emptyActivity}>
            <div className={styles.emptyIconWrapper} aria-hidden="true">
              <Clock size={24} />
            </div>
            <h3 className={styles.emptyTitle}>Your activity will appear here</h3>
            <p className={styles.emptyDesc}>
              Resume analysis results, mock interview practice sessions, and job application
              updates will automatically log here as you use CareerLens AI.
            </p>
            <Link to={ROUTES.RESUME} className={styles.statusActionRow}>
              <span>Upload your first resume</span>
              <ArrowRight size={13} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Right: Recommended Next Action (Prominent Onboarding Card) */}
        <div className={styles.nextActionCard}>
          <div>
            <div className={styles.nextActionBadge}>
              <Sparkles size={14} aria-hidden="true" />
              <span>Recommended Next Step</span>
            </div>
            <h2 className={styles.nextActionHeadline}>Start with your resume</h2>
            <p className={styles.nextActionDesc}>
              Upload your resume to unlock Resume Intelligence, Job Matching comparison, and
              automated Skill Gap detection.
            </p>
          </div>

          <div>
            <Link to={ROUTES.RESUME} className={styles.primaryCtaBtn}>
              <span>Go to Resume</span>
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Section 5: Recommended for You / Quick Actions (4 Columns) ── */}
      <section className={styles.recommendationsSection} aria-label="Recommended modules">
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Recommended for You</h2>
            <p className={styles.sectionSubtitle}>
              Core tools to accelerate your career preparation.
            </p>
          </div>
        </div>

        <div className={styles.actionsGrid}>
          {QUICK_ACTIONS.map((action) => (
            <Link
              key={action.id}
              to={action.link}
              className={styles.actionCard}
              aria-label={`${action.title}: ${action.desc}`}
            >
              <div className={styles.actionIcon} aria-hidden="true">
                {action.icon}
              </div>
              <h3 className={styles.actionTitle}>{action.title}</h3>
              <p className={styles.actionDesc}>{action.desc}</p>
              <div className={styles.actionLink} aria-hidden="true">
                <span>Open module</span>
                <ArrowRight size={13} />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
