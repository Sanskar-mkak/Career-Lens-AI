import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, ArrowRight, FileText, Crosshair, TrendingUp, Mic } from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import styles from '../LandingPage.module.css';

type PreviewTab = 'resume' | 'match' | 'gap' | 'interview';

export const ProductPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PreviewTab>('resume');

  return (
    <section id="why-careerlens" className={styles.previewSection} aria-labelledby="why-heading">
      <div className={styles.contentWrapper}>
        <div className={styles.previewGrid}>
          {/* Left Column: Realistic Product Structure Preview */}
          <div className={styles.previewCardFrame} id="product-preview">
            <div className={styles.previewCardHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
                <span
                  style={{
                    width: '10px',
                    height: '10px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-primary)',
                  }}
                  aria-hidden="true"
                />
                <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
                  Workspace Structure Preview
                </span>
              </div>

              {/* Navigation Tabs */}
              <div className={styles.previewCardNav} role="tablist" aria-label="Product Modules">
                <button
                  role="tab"
                  aria-selected={activeTab === 'resume'}
                  className={`${styles.previewTabBtn} ${activeTab === 'resume' ? styles.previewTabBtnActive : ''}`}
                  onClick={() => setActiveTab('resume')}
                >
                  Resume Analysis
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'match'}
                  className={`${styles.previewTabBtn} ${activeTab === 'match' ? styles.previewTabBtnActive : ''}`}
                  onClick={() => setActiveTab('match')}
                >
                  Job Match
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'gap'}
                  className={`${styles.previewTabBtn} ${activeTab === 'gap' ? styles.previewTabBtnActive : ''}`}
                  onClick={() => setActiveTab('gap')}
                >
                  Skill Gap
                </button>
                <button
                  role="tab"
                  aria-selected={activeTab === 'interview'}
                  className={`${styles.previewTabBtn} ${activeTab === 'interview' ? styles.previewTabBtnActive : ''}`}
                  onClick={() => setActiveTab('interview')}
                >
                  Interview
                </button>
              </div>
            </div>

            <div className={styles.previewCardBody}>
              {/* Tab 1: Resume Analysis Structure */}
              {activeTab === 'resume' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <FileText size={18} color="var(--color-primary)" />
                    <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
                      Resume Structure & Quality Assessment
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Skills Detected</div>
                      <div style={{ fontWeight: 600, fontSize: 'var(--font-size-xs)', marginTop: '0.25rem' }}>TypeScript, React, Python, REST APIs, SQL</div>
                    </div>
                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Experience Verification</div>
                      <div style={{ fontWeight: 600, fontSize: 'var(--font-size-xs)', marginTop: '0.25rem' }}>Full-Stack Internships, Projects, Production Deployments</div>
                    </div>
                  </div>

                  <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--font-size-xs)', marginBottom: '0.5rem' }}>
                      <span style={{ fontWeight: 600 }}>Section Structure Check</span>
                      <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>Standard Sections Detected</span>
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: '0.6875rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-hover)' }}>✓ Contact Info</span>
                      <span style={{ fontSize: '0.6875rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-hover)' }}>✓ Education</span>
                      <span style={{ fontSize: '0.6875rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-hover)' }}>✓ Technical Skills</span>
                      <span style={{ fontSize: '0.6875rem', padding: '0.2rem 0.5rem', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-surface-hover)' }}>✓ Projects & Work</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Job Match Structure */}
              {activeTab === 'match' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <Crosshair size={18} color="var(--color-success)" />
                    <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
                      Job Requirement Alignment
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-success)', fontWeight: 700, textTransform: 'uppercase' }}>Matching Skills</div>
                      <div style={{ fontWeight: 600, fontSize: 'var(--font-size-xs)', marginTop: '0.25rem' }}>
                        Frontend Architecture, Modern React, Component State Modeling, Responsive UI
                      </div>
                    </div>

                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-warning)', fontWeight: 700, textTransform: 'uppercase' }}>Missing or Weak Requirements</div>
                      <div style={{ fontWeight: 600, fontSize: 'var(--font-size-xs)', marginTop: '0.25rem' }}>
                        Distributed Tracing, Cloud Orchestration (Kubernetes)
                      </div>
                    </div>

                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-primary)', fontWeight: 700, textTransform: 'uppercase' }}>Match Insights</div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                        Strong alignment with client-side engineering expectations. Recommended focus: highlight backend data pipeline contributions.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 3: Skill Gap Structure */}
              {activeTab === 'gap' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <TrendingUp size={18} color="var(--color-warning)" />
                    <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
                      Skill Gap & Improvement Areas
                    </span>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)' }}>System Design Fundamentals</span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--color-warning)', fontWeight: 700 }}>Priority Gap</span>
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                        Target role expects architectural trade-off discussion. Current resume shows implementation focus without system-level scope.
                      </div>
                    </div>

                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                        <span style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)' }}>Automated Testing & CI/CD</span>
                        <span style={{ fontSize: '0.6875rem', color: 'var(--color-primary)', fontWeight: 700 }}>Moderate Gap</span>
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)' }}>
                        Evidence shows unit testing familiarity. Recommended addition: end-to-end integration workflows.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 4: Interview Structure */}
              {activeTab === 'interview' && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
                    <Mic size={18} color="#8B5CF6" />
                    <span style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
                      Adaptive Mock Interview Configuration
                    </span>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Session Type</div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', marginTop: '0.25rem' }}>Technical & System Design</div>
                    </div>
                    <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                      <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Difficulty Level</div>
                      <div style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', marginTop: '0.25rem' }}>Role-Aligned / Adaptive</div>
                    </div>
                  </div>

                  <div style={{ padding: '0.875rem', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
                    <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>Evaluation Dimensions</div>
                    <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>
                      Answer depth, technical accuracy, communication clarity, structured reasoning.
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className={styles.previewFooterNote}>
              Illustrative product structure preview. Interactive workspace activates upon login.
            </div>
          </div>

          {/* Right Column: Value Proposition & Checklist */}
          <div className={styles.previewInfo}>
            <div className={styles.sectionOverline}>WHY CAREERLENS?</div>
            <h2 id="why-heading" className={styles.sectionTitle}>
              A Smarter Way to Build Your Career
            </h2>
            <p className={styles.sectionSubtitle}>
              CareerLens AI connects your resume, target roles, skill gaps, and interview prep into one cohesive system. Gain clarity on where you stand and what to improve next.
            </p>

            <ul className={styles.checkList}>
              <li className={styles.checkItem}>
                <div className={styles.checkIcon} aria-hidden="true">
                  <Check size={16} />
                </div>
                <span>AI-powered resume analysis</span>
              </li>
              <li className={styles.checkItem}>
                <div className={styles.checkIcon} aria-hidden="true">
                  <Check size={16} />
                </div>
                <span>Job-specific recommendations</span>
              </li>
              <li className={styles.checkItem}>
                <div className={styles.checkIcon} aria-hidden="true">
                  <Check size={16} />
                </div>
                <span>Adaptive mock interview practice</span>
              </li>
              <li className={styles.checkItem}>
                <div className={styles.checkIcon} aria-hidden="true">
                  <Check size={16} />
                </div>
                <span>Evidence-based skill gap identification</span>
              </li>
            </ul>

            <Link to={ROUTES.REGISTER} className={styles.heroPrimaryBtn}>
              <span>Get Started Free</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductPreview;
