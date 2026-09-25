/**
 * CareerLens AI — Interview Setup Page
 *
 * Route: /interview/setup
 * Visual Reference: Website Look/Set up Interview.png
 *
 * Configures the parameters for a mock interview simulation.
 * Frontend configuration state only; transitions to /interview/live.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Code,
  Users,
  Layers,
  Sliders,
  Briefcase,
  Clock,
  Sparkles,
  Timer,
  FileCheck,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  X,
  Plus,
} from 'lucide-react';
import { MascotCanvas } from '@/mascot';
import { ROUTES } from '@/app/routes/routes';
import styles from './InterviewSetupPage.module.css';

interface InterviewTypeOption {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

const INTERVIEW_TYPES: InterviewTypeOption[] = [
  {
    id: 'technical',
    name: 'Technical',
    desc: 'DSA, system design, and core tech concepts',
    icon: <Code size={18} />,
  },
  {
    id: 'behavioral',
    name: 'Behavioral',
    desc: 'Leadership, teamwork, and situational problem solving',
    icon: <Users size={18} />,
  },
  {
    id: 'mixed',
    name: 'Mixed',
    desc: 'Comprehensive blend of technical + behavioral questions',
    icon: <Layers size={18} />,
  },
  {
    id: 'custom',
    name: 'Custom',
    desc: 'Tailor focus areas and question topics manually',
    icon: <Sliders size={18} />,
  },
];

export const InterviewSetupPage: React.FC = () => {
  const navigate = useNavigate();

  const [selectedType, setSelectedType] = useState('technical');
  const [role, setRole] = useState('Software Engineer');
  const [company, setCompany] = useState('Google (Example)');
  const [experience, setExperience] = useState('2 – 5 years');
  const [focusAreas, setFocusAreas] = useState<string[]>([
    'Data Structures',
    'System Design',
    'REST APIs',
  ]);
  const [newTagInput, setNewTagInput] = useState('');
  const [showAddTag, setShowAddTag] = useState(false);

  const [numQuestions, setNumQuestions] = useState('10 Questions');
  const [difficulty, setDifficulty] = useState('Medium');
  const [interviewMode, setInterviewMode] = useState('Text + Voice');

  const [aiFeedback, setAiFeedback] = useState(true);
  const [realtimeHints, setRealtimeHints] = useState(false);
  const [timerEnabled, setTimerEnabled] = useState(true);
  const [detailedReport, setDetailedReport] = useState(true);

  const handleRemoveTag = (tag: string) => {
    setFocusAreas((prev) => prev.filter((t) => t !== tag));
  };

  const handleAddTag = () => {
    if (newTagInput.trim() && !focusAreas.includes(newTagInput.trim())) {
      setFocusAreas((prev) => [...prev, newTagInput.trim()]);
      setNewTagInput('');
      setShowAddTag(false);
    }
  };

  const handleStart = () => {
    navigate(ROUTES.INTERVIEW_LIVE);
  };

  return (
    <div className={styles.pageContainer}>
      {/* ── Section 1: Hero Header Banner ── */}
      <section className={styles.heroBanner} aria-label="Mock Interview Configuration">
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Interview Setup</span>
          <h1 className={styles.heroHeadline}>
            Set Up Your <span className={styles.headlineAccent}>Mock Interview</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Configure role criteria, difficulty, and focus topics. CareerLens AI will structure a
            targeted simulation tailored to your target job.
          </p>
        </div>

        {/* Mascot Container */}
        <div className={styles.heroMascotArea} aria-hidden="true">
          <div className={styles.speechBubble}>
            Let&rsquo;s create your <span style={{ color: 'var(--color-primary)' }}>perfect session!</span>
          </div>
          <div className={styles.mascotCanvasBox}>
            <MascotCanvas
              semanticState="GREETING"
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

      {/* ── Step 1: Select Interview Type ── */}
      <div className={styles.stepCard}>
        <div className={styles.stepHeader}>
          <div className={styles.stepBadge}>1</div>
          <h2 className={styles.stepTitle}>Select Interview Type</h2>
        </div>

        <div className={styles.typesGrid} role="radiogroup" aria-label="Interview Type Options">
          {INTERVIEW_TYPES.map((type) => {
            const active = selectedType === type.id;
            return (
              <button
                key={type.id}
                type="button"
                role="radio"
                aria-checked={active}
                className={`${styles.typeCard} ${active ? styles.typeCardActive : ''}`}
                onClick={() => setSelectedType(type.id)}
              >
                <div className={styles.typeIconWrapper} aria-hidden="true">
                  {type.icon}
                </div>
                <h3 className={styles.typeName}>{type.name}</h3>
                <p className={styles.typeDesc}>{type.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Step 2: Set Role & Company (Optional) ── */}
      <div className={styles.stepCard}>
        <div className={styles.stepHeader}>
          <div className={styles.stepBadge}>2</div>
          <h2 className={styles.stepTitle}>Set Role &amp; Target Context (Optional)</h2>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="interview-role" className={styles.label}>
              Target Role / Title
            </label>
            <input
              id="interview-role"
              type="text"
              className={styles.textInput}
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="e.g. Software Engineer"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="interview-company" className={styles.label}>
              Target Company Template
            </label>
            <input
              id="interview-company"
              type="text"
              className={styles.textInput}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              placeholder="e.g. Google, Amazon, Startup"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="interview-experience" className={styles.label}>
              Experience Level
            </label>
            <select
              id="interview-experience"
              className={styles.selectInput}
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
            >
              <option value="Entry Level (0–2 yrs)">Entry Level (0–2 yrs)</option>
              <option value="2 – 5 years">2 – 5 years</option>
              <option value="5 – 8 years">5 – 8 years</option>
              <option value="8+ years">8+ years</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Focus Areas (Topics to emphasize)</label>
            <div className={styles.tagsRow}>
              {focusAreas.map((tag) => (
                <span key={tag} className={styles.tagChip}>
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className={styles.tagRemoveBtn}
                    aria-label={`Remove focus area ${tag}`}
                  >
                    <X size={12} />
                  </button>
                </span>
              ))}

              {showAddTag ? (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    placeholder="Topic name..."
                    style={{
                      height: '1.75rem',
                      padding: '0 0.5rem',
                      fontSize: 'var(--font-size-xs)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--color-border)',
                      backgroundColor: 'var(--color-bg)',
                      color: 'var(--color-text-primary)',
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleAddTag();
                      if (e.key === 'Escape') setShowAddTag(false);
                    }}
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-primary-contrast)',
                      fontWeight: 600,
                    }}
                  >
                    Add
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowAddTag(true)}
                  className={styles.tagChip}
                  style={{ borderStyle: 'dashed', cursor: 'pointer' }}
                >
                  <Plus size={12} />
                  <span>Add Focus Area</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Step 3: Interview Preferences ── */}
      <div className={styles.stepCard}>
        <div className={styles.stepHeader}>
          <div className={styles.stepBadge}>3</div>
          <h2 className={styles.stepTitle}>Interview Preferences</h2>
        </div>

        <div className={styles.formGrid}>
          <div className={styles.inputGroup}>
            <label htmlFor="num-questions" className={styles.label}>
              Number of Questions
            </label>
            <select
              id="num-questions"
              className={styles.selectInput}
              value={numQuestions}
              onChange={(e) => setNumQuestions(e.target.value)}
            >
              <option value="5 Questions">5 Questions (~ 20 min)</option>
              <option value="10 Questions">10 Questions (~ 40 min)</option>
              <option value="15 Questions">15 Questions (~ 60 min)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="difficulty-level" className={styles.label}>
              Difficulty Level
            </label>
            <select
              id="difficulty-level"
              className={styles.selectInput}
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="Easy">Easy — Foundational &amp; Definitions</option>
              <option value="Medium">Medium — Scenario &amp; Implementation</option>
              <option value="Hard">Hard — Architecture &amp; Optimization</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="interview-mode" className={styles.label}>
              Interview Mode
            </label>
            <select
              id="interview-mode"
              className={styles.selectInput}
              value={interviewMode}
              onChange={(e) => setInterviewMode(e.target.value)}
            >
              <option value="Text + Voice">Text + Voice (Interactive)</option>
              <option value="Text Only">Text Only (Reading &amp; Typing)</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label className={styles.label}>Estimated Session Length</label>
            <div
              style={{
                height: '2.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0 0.875rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-subtle)',
                border: '1px solid var(--color-border)',
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-secondary)',
              }}
            >
              <Clock size={16} color="var(--color-primary)" aria-hidden="true" />
              <span>
                {numQuestions === '5 Questions'
                  ? '~ 20 minutes'
                  : numQuestions === '15 Questions'
                  ? '~ 60 minutes'
                  : '~ 40 minutes'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Step 4: Additional Settings ── */}
      <div className={styles.stepCard}>
        <div className={styles.stepHeader}>
          <div className={styles.stepBadge}>4</div>
          <h2 className={styles.stepTitle}>Session Controls &amp; Settings</h2>
        </div>

        <div className={styles.togglesGrid}>
          {/* AI Feedback Toggle */}
          <div className={styles.toggleCard}>
            <div className={styles.toggleLeft}>
              <Sparkles size={20} className={styles.toggleIcon} aria-hidden="true" />
              <div className={styles.toggleText}>
                <span className={styles.toggleTitle}>AI Feedback</span>
                <span className={styles.toggleDesc}>
                  Receive structured criteria feedback after submitting each answer.
                </span>
              </div>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={aiFeedback}
                onChange={(e) => setAiFeedback(e.target.checked)}
                aria-label="Toggle AI Feedback"
              />
              <span className={styles.slider} />
            </label>
          </div>

          {/* Real-time Hints Toggle */}
          <div className={styles.toggleCard}>
            <div className={styles.toggleLeft}>
              <Lightbulb size={20} className={styles.toggleIcon} aria-hidden="true" />
              <div className={styles.toggleText}>
                <span className={styles.toggleTitle}>Real-time Hints</span>
                <span className={styles.toggleDesc}>
                  Optionally request progressive hints if stuck on a question.
                </span>
              </div>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={realtimeHints}
                onChange={(e) => setRealtimeHints(e.target.checked)}
                aria-label="Toggle Real-time Hints"
              />
              <span className={styles.slider} />
            </label>
          </div>

          {/* Timer Toggle */}
          <div className={styles.toggleCard}>
            <div className={styles.toggleLeft}>
              <Timer size={20} className={styles.toggleIcon} aria-hidden="true" />
              <div className={styles.toggleText}>
                <span className={styles.toggleTitle}>Per-Question Timer</span>
                <span className={styles.toggleDesc}>
                  Display recommended response time benchmarks per question.
                </span>
              </div>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={timerEnabled}
                onChange={(e) => setTimerEnabled(e.target.checked)}
                aria-label="Toggle Per-Question Timer"
              />
              <span className={styles.slider} />
            </label>
          </div>

          {/* Detailed Report Toggle */}
          <div className={styles.toggleCard}>
            <div className={styles.toggleLeft}>
              <FileCheck size={20} className={styles.toggleIcon} aria-hidden="true" />
              <div className={styles.toggleText}>
                <span className={styles.toggleTitle}>Detailed Session Report</span>
                <span className={styles.toggleDesc}>
                  Compile a complete performance and question breakdown upon finishing.
                </span>
              </div>
            </div>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={detailedReport}
                onChange={(e) => setDetailedReport(e.target.checked)}
                aria-label="Toggle Detailed Report"
              />
              <span className={styles.slider} />
            </label>
          </div>
        </div>
      </div>

      {/* ── Primary Start Action ── */}
      <div>
        <button type="button" className={styles.startBtn} onClick={handleStart}>
          <span>Start Interview Simulation</span>
          <ArrowRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* ── Section 3: Feature Highlights (3 Cards) ── */}
      <section className={styles.featuresGrid} aria-label="Simulation Benefits">
        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper} aria-hidden="true">
            <Briefcase size={18} />
          </div>
          <div className={styles.featureText}>
            <h3 className={styles.featureTitle}>Realistic Question Flow</h3>
            <p className={styles.featureDesc}>
              Simulates actual company interview formats, progression, and technical depth.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper} aria-hidden="true">
            <Sparkles size={18} />
          </div>
          <div className={styles.featureText}>
            <h3 className={styles.featureTitle}>Objective Evaluation</h3>
            <p className={styles.featureDesc}>
              Evaluates answer completeness, structural clarity, and architectural tradeoffs.
            </p>
          </div>
        </div>

        <div className={styles.featureCard}>
          <div className={styles.featureIconWrapper} aria-hidden="true">
            <TrendingUp size={18} />
          </div>
          <div className={styles.featureText}>
            <h3 className={styles.featureTitle}>Progress Over Time</h3>
            <p className={styles.featureDesc}>
              Tracks practice session consistency and topic improvements in your dashboard.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InterviewSetupPage;
