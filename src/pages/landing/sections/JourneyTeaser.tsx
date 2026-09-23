import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import styles from '../LandingPage.module.css';

export const JourneyTeaser: React.FC = () => {
  return (
    <section id="how-it-works" className={styles.journeySection} aria-labelledby="journey-heading">
      <div className={styles.contentWrapper}>
        <div className={styles.journeyBox}>
          <div className={styles.journeyOverline}>MORE THAN A TOOL</div>
          <h2 id="journey-heading" className={styles.journeyTitle}>
            A Partner in Your Journey
          </h2>
          <p className={styles.journeyText}>
            From your first resume to your next opportunity, CareerLens AI helps you prepare, improve, practice, and track your progress.
          </p>

          <div className={styles.workflowSteps}>
            <div className={styles.stepPill}>1. Analyze Resume</div>
            <div className={styles.stepPill}>2. Compare with Target Job</div>
            <div className={styles.stepPill}>3. Identify Skill Gaps</div>
            <div className={styles.stepPill}>4. Practice Interviews</div>
          </div>

          <Link to={ROUTES.REGISTER} className={styles.heroPrimaryBtn}>
            <span>Get Started Free</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default JourneyTeaser;
