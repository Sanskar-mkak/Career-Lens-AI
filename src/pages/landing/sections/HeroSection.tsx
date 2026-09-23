import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, Play, BarChart3, Lightbulb, Mic, Target } from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import styles from '../LandingPage.module.css';

export const HeroSection: React.FC = () => {
  const handleWatchDemoClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const previewSection = document.getElementById('product-preview');
    if (previewSection) {
      previewSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.heroSection} aria-labelledby="hero-heading">
      <div className={styles.contentWrapper}>
        <div className={styles.heroGrid}>
          {/* Left Column: Copy & Actions */}
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Sparkles size={14} />
              <span>AI-Powered Career Growth</span>
            </div>

            <h1 id="hero-heading" className={styles.heroTitle}>
              Your Resume. Our Intelligence.{' '}
              <span className={styles.heroAccent}>A Brighter Future.</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Analyze. Improve. Practice. Apply. Everything you need to build your career — powered by AI.
            </p>

            <div className={styles.heroCtas}>
              <Link to={ROUTES.REGISTER} className={styles.heroPrimaryBtn}>
                <span>Get Started Free</span>
                <ArrowRight size={18} />
              </Link>

              <a
                href="#product-preview"
                onClick={handleWatchDemoClick}
                className={styles.heroSecondaryBtn}
                aria-label="Watch interactive product demo preview"
              >
                <Play size={16} fill="currentColor" />
                <span>Watch Demo</span>
              </a>
            </div>

            <div className={styles.heroAudienceNote}>
              <span className={styles.audienceDot} aria-hidden="true" />
              <span>Built for students, recent graduates, and software professionals</span>
            </div>
          </div>

          {/* Right Column: Visual Area with Dedicated Mascot Container & Status Pills */}
          <div className={styles.heroVisualArea} aria-label="CareerLens intelligence platform preview">
            {/* Callout Note */}
            <div className={styles.floatingCallout}>
              Same You. Better Opportunities.
            </div>

            {/* Floating Status Pill 1: Resume Analysis */}
            <div className={`${styles.floatingCard} ${styles.cardTopLeft}`}>
              <div className={styles.floatingIcon}>
                <BarChart3 size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)' }}>
                  Resume Analysis
                </div>
                <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Structured Feedback
                </div>
              </div>
            </div>

            {/* Floating Status Pill 2: Skill Gap */}
            <div className={`${styles.floatingCard} ${styles.cardTopRight}`}>
              <div className={styles.floatingIcon}>
                <Lightbulb size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)' }}>Skill Gap</div>
                <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Target Focus Areas
                </div>
              </div>
            </div>

            {/* 
              ==================================================================
              MASCOT ASSET INTEGRATION CONTAINER
              This dedicated container is specifically reserved for the future 
              CareerLens 3D mascot render (mascot-light.png / mascot-dark.png).
              When the standalone transparent asset is available, insert it here:
              
              <img 
                src="/src/assets/branding/mascot.png" 
                alt="CareerLens AI Mascot" 
                className={styles.mascotImage}
              />
              ==================================================================
            */}
            <div className={styles.mascotPlaceholderBox}>
              <div className={styles.mascotEmblem}>CL</div>
              <h2 className={styles.mascotHeading}>CareerLens Mascot</h2>
              <p className={styles.mascotCaption}>
                Visual placeholder container reserved for the CareerLens 3D companion asset.
              </p>
              <code className={styles.mascotCodeBadge}>
                {/* Visual anchor indicator */}
                Reserved Asset Area (380x420px)
              </code>
            </div>

            {/* Floating Status Pill 3: Mock Interview */}
            <div className={`${styles.floatingCard} ${styles.cardBottomLeft}`}>
              <div className={styles.floatingIcon}>
                <Mic size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)' }}>
                  Mock Interview
                </div>
                <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Adaptive Practice
                </div>
              </div>
            </div>

            {/* Floating Status Pill 4: Job Match */}
            <div className={`${styles.floatingCard} ${styles.cardBottomRight}`}>
              <div className={styles.floatingIcon}>
                <Target size={16} />
              </div>
              <div>
                <div style={{ fontSize: '0.6875rem', color: 'var(--color-text-secondary)' }}>Job Match</div>
                <div style={{ fontWeight: 700, color: 'var(--color-text-primary)' }}>
                  Role Alignment
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
