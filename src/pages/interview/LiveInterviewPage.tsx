/**
 * CareerLens AI — Live Interview Simulation Page
 *
 * Route: /interview/live
 * Visual Reference: Website Look/Interview.png
 *
 * Simulates the live mock interview environment.
 * Truthful frontend interaction representing the active session experience
 * without pretending speech recognition or AI evaluation is running.
 */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  Video,
  Clock,
  Flag,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
} from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import { MascotCanvas } from '@/mascot';
import styles from './LiveInterviewPage.module.css';

interface QuestionItem {
  id: number;
  category: string;
  text: string;
  timeEst: string;
  hint: string;
}

const SAMPLE_QUESTIONS: QuestionItem[] = [
  {
    id: 1,
    category: 'Introduction',
    text: 'Please introduce yourself, your engineering background, and what inspired you to pursue full-stack software development.',
    timeEst: '02:00',
    hint: 'Focus on your education, key projects, and relevant technologies.',
  },
  {
    id: 2,
    category: 'Technical Architecture',
    text: 'Can you explain the difference between SQL and NoSQL databases? In which production scenarios would you choose each?',
    timeEst: '04:30',
    hint: 'Compare schema rigidity, ACID vs BASE guarantees, and horizontal vs vertical scaling.',
  },
  {
    id: 3,
    category: 'System Design',
    text: 'How would you design a distributed caching layer for a high-traffic web service to minimize latency and database load?',
    timeEst: '05:00',
    hint: 'Mention cache eviction policies (LRU/LFU), Redis/Memcached, and cache-aside vs write-through patterns.',
  },
];

const INTERVIEW_STAGES = [
  { step: 1, name: 'Introduction', status: 'completed' },
  { step: 2, name: 'Technical Fundamentals', status: 'current' },
  { step: 3, name: 'Problem Solving & Scenarios', status: 'upcoming' },
  { step: 4, name: 'Behavioral & Leadership', status: 'upcoming' },
  { step: 5, name: 'Wrap Up & Next Steps', status: 'upcoming' },
];

export const LiveInterviewPage: React.FC = () => {
  const navigate = useNavigate();

  const [currentIdx, setCurrentIdx] = useState(1); // Default to question 2 (Technical)
  const [answerText, setAnswerText] = useState('');
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [isMicActive, setIsMicActive] = useState(false);
  const [isVideoActive, setIsVideoActive] = useState(false);

  const currentQuestion = SAMPLE_QUESTIONS[currentIdx] || SAMPLE_QUESTIONS[0];

  const handleNext = () => {
    if (currentIdx < SAMPLE_QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setAnswerText('');
      setActiveHint(null);
    } else {
      navigate(ROUTES.INTERVIEW_REPORT);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
      setAnswerText('');
      setActiveHint(null);
    }
  };

  const handleFinish = () => {
    navigate(ROUTES.INTERVIEW_REPORT);
  };

  return (
    <div className={styles.pageContainer}>
      {/* ── Section 1: Hero Header Banner ── */}
      <section className={styles.heroBanner} aria-label="Active Mock Interview Session">
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Live Mock Interview</span>
          <h1 className={styles.heroHeadline}>
            You&rsquo;ve <span className={styles.headlineAccent}>Got This!</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Answer naturally, articulate your design decisions, and practice role communication.
          </p>

          <div className={styles.contextBadgesRow}>
            <span className={styles.contextBadge}>Software Engineer @ Google (Simulated)</span>
            <span className={styles.contextBadge}>Technical Interview (Medium)</span>
            <span className={styles.contextBadge}>
              Question {currentIdx + 1} of {SAMPLE_QUESTIONS.length}
            </span>
          </div>
        </div>

        {/* Mascot Footprint */}
        <div className={styles.heroMascotArea} aria-hidden="true">
          <div className={styles.speechBubble}>
            Practice like it&rsquo;s <span style={{ color: 'var(--color-primary)' }}>real!</span>
          </div>
          <div className={styles.mascotCanvasBox}>
            <MascotCanvas
              semanticState={isMicActive ? 'LISTENING' : 'FOCUSED'}
              cameraPreset="compact"
              transparent
              showPlatform={false}
            />
          </div>
        </div>
      </section>


      {/* ── Status Notice Banner ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.625rem',
          padding: '0.75rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          backgroundColor: 'var(--color-bg-subtle)',
          border: '1px solid var(--color-border)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-secondary)',
        }}
        role="status"
      >
        <AlertCircle size={16} color="var(--color-primary)" aria-hidden="true" />
        <span>
          <strong>Simulation Preview Mode:</strong> Microphone transcription and active AI
          evaluation will connect upon backend model integration. You can type answers and navigate
          between questions to explore the full interview workflow.
        </span>
      </div>

      {/* ── Section 2: Two-Column Live Session Workspace ── */}
      <div className={styles.workspaceGrid}>
        {/* Left Column: Virtual Interviewer Screen & Active Question */}
        <div className={styles.leftColumn}>
          {/* Virtual Interviewer Stage Card */}
          <div className={styles.videoStageCard}>
            <div className={styles.stageWatermark}>
              <Sparkles size={16} color="var(--color-primary)" aria-hidden="true" />
              <span>CareerLens AI Simulation</span>
            </div>

            <div className={styles.interviewerAvatarPlaceholder} aria-hidden="true">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="24" cy="18" r="10" fill="#e2e8f0" />
                <ellipse cx="24" cy="38" rx="15" ry="9" fill="#e2e8f0" />
              </svg>
            </div>

            <p className={styles.interviewerMotto}>Good Answers Brighter Careers</p>
            <p className={styles.interviewerSubtext}>
              Take a breath and structure your thoughts before responding.
            </p>

            <div className={styles.stageControlsBar}>
              {/* Audio Wave Visualizer */}
              <div className={styles.audioWavePlaceholder} aria-hidden="true">
                <div className={styles.waveBar} style={{ height: '6px' }} />
                <div className={styles.waveBar} style={{ height: '14px' }} />
                <div className={styles.waveBar} style={{ height: '10px' }} />
                <div className={styles.waveBar} style={{ height: '18px' }} />
                <div className={styles.waveBar} style={{ height: '8px' }} />
                <div className={styles.waveBar} style={{ height: '12px' }} />
              </div>

              <div className={styles.stageStatusPill}>
                <span>● AI Ready</span>
              </div>

              {/* Camera & Mic Toggle Buttons */}
              <div className={styles.stageMediaButtons}>
                <button
                  type="button"
                  className={styles.stageMediaBtn}
                  onClick={() => setIsMicActive((prev) => !prev)}
                  style={{
                    backgroundColor: isMicActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                  aria-label={isMicActive ? 'Mute microphone' : 'Unmute microphone'}
                  title={isMicActive ? 'Mute microphone' : 'Unmute microphone'}
                >
                  <Mic size={14} />
                </button>
                <button
                  type="button"
                  className={styles.stageMediaBtn}
                  onClick={() => setIsVideoActive((prev) => !prev)}
                  style={{
                    backgroundColor: isVideoActive ? 'var(--color-primary)' : 'rgba(255, 255, 255, 0.1)',
                  }}
                  aria-label={isVideoActive ? 'Stop video' : 'Start video'}
                  title={isVideoActive ? 'Stop video' : 'Start video'}
                >
                  <Video size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Active Question Card */}
          <div className={styles.questionCard}>
            <div className={styles.questionHeaderRow}>
              <span className={styles.questionTypePill}>{currentQuestion.category}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div className={styles.timerBox}>
                  <Clock size={13} color="var(--color-primary)" aria-hidden="true" />
                  <span>Target: {currentQuestion.timeEst}</span>
                </div>
                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  aria-label="Flag question for review"
                  title="Flag question"
                >
                  <Flag size={14} />
                </button>
              </div>
            </div>

            <h2 className={styles.questionTitle}>{currentQuestion.text}</h2>

            {/* Answer Input Area */}
            <div className={styles.answerInputArea}>
              <textarea
                className={styles.answerTextarea}
                placeholder="Type your response notes or key talking points here..."
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                aria-label="Your answer response"
              />
            </div>

            {/* Inline Hint Card if requested */}
            {activeHint && (
              <div
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid var(--color-primary)',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-primary)',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                }}
              >
                <Lightbulb size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span>
                  <strong>Hint:</strong> {activeHint}
                </span>
              </div>
            )}

            {/* Question Navigation & Actions */}
            <div className={styles.questionActionsRow}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className={styles.navPrevBtn}
                style={{ opacity: currentIdx === 0 ? 0.5 : 1, cursor: currentIdx === 0 ? 'not-allowed' : 'pointer' }}
              >
                <ArrowLeft size={14} aria-hidden="true" />
                <span>Previous</span>
              </button>

              <button
                type="button"
                className={styles.doneAnsweringBtn}
                onClick={handleNext}
              >
                <span>Done Answering</span>
                <CheckCircle2 size={14} aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className={styles.navNextBtn}
                style={{ backgroundColor: 'var(--color-primary-light)', color: 'var(--color-primary)', borderColor: 'var(--color-primary)' }}
              >
                <span>Finish &amp; View Report</span>
                <ArrowRight size={14} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Progress & Tips */}
        <div className={styles.rightColumn}>
          {/* Progress Card */}
          <div className={styles.progressCard}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 className={styles.panelTitle}>Session Progress</h3>
              <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)', fontWeight: 700 }}>
                Question {currentIdx + 1} of {SAMPLE_QUESTIONS.length}
              </span>
            </div>

            <div className={styles.progressBarContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progressFill}
                  style={{ width: `${((currentIdx + 1) / SAMPLE_QUESTIONS.length) * 100}%` }}
                />
              </div>
            </div>

            <ul className={styles.stepsList}>
              {INTERVIEW_STAGES.map((stage) => (
                <li key={stage.step} className={styles.stepRow}>
                  {stage.step <= currentIdx + 1 ? (
                    <div className={styles.stepNumActive}>✓</div>
                  ) : (
                    <div className={styles.stepNumPending}>{stage.step}</div>
                  )}
                  <span
                    style={{
                      fontWeight: stage.step === currentIdx + 1 ? 700 : 500,
                      color: stage.step === currentIdx + 1 ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                    }}
                  >
                    {stage.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tips Card */}
          <div className={styles.tipsCard}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Lightbulb size={18} color="var(--color-primary)" aria-hidden="true" />
              <h3 className={styles.panelTitle}>Tips for this Question</h3>
            </div>

            <ul className={styles.tipsList}>
              <li className={styles.tipItem}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
                <span>Be clear, structured, and start with high-level context.</span>
              </li>
              <li className={styles.tipItem}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
                <span>Think out loud to reveal your problem-solving logic.</span>
              </li>
              <li className={styles.tipItem}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
                <span>Take a moment to formulate tradeoffs before answering.</span>
              </li>
              <li className={styles.tipItem}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>•</span>
                <span>Tie technical concepts back to production systems.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Section 3: Real-Time AI Support Toolbar ── */}
      <div className={styles.supportToolbar}>
        <div className={styles.supportLeft}>
          <Sparkles size={18} color="var(--color-primary)" aria-hidden="true" />
          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-primary)' }}>
            Real-Time AI Support
          </span>
        </div>

        <div className={styles.supportButtons}>
          <button
            type="button"
            className={styles.supportBtn}
            onClick={() => setActiveHint(currentQuestion.hint)}
          >
            <HelpCircle size={14} aria-hidden="true" />
            <span>Get a Hint</span>
          </button>
          <button
            type="button"
            className={styles.supportBtn}
            onClick={() =>
              setActiveHint('Try explaining tradeoffs between relational schema integrity and horizontal document scaling.')
            }
          >
            <RotateCcw size={14} aria-hidden="true" />
            <span>Rephrase Question</span>
          </button>
          <button
            type="button"
            className={styles.supportBtn}
            onClick={() =>
              setActiveHint('Example Outline: 1. Schema definition, 2. Scalability patterns, 3. ACID vs Eventual Consistency, 4. Use-case examples.')
            }
          >
            <Lightbulb size={14} aria-hidden="true" />
            <span>Example Outline</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveInterviewPage;
