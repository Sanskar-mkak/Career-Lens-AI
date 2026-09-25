import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileSearch, GitCompare, Sparkles, MessageSquare } from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import styles from '../LandingPage.module.css';

interface JourneyStep {
  number: string;
  title: string;
  subtitle: string;
  variant: 'stepBlue' | 'stepGreen' | 'stepPurple' | 'stepOrange';
  icon: React.ReactNode;
}

const STEPS: JourneyStep[] = [
  {
    number: '01',
    title: 'Analyze Resume',
    subtitle: 'Extract skills & structure',
    variant: 'stepBlue',
    icon: <FileSearch size={22} strokeWidth={2} />,
  },
  {
    number: '02',
    title: 'Compare with Job',
    subtitle: 'Match requirements & gaps',
    variant: 'stepGreen',
    icon: <GitCompare size={22} strokeWidth={2} />,
  },
  {
    number: '03',
    title: 'Identify Skill Gaps',
    subtitle: 'Target high-impact areas',
    variant: 'stepPurple',
    icon: <Sparkles size={22} strokeWidth={2} />,
  },
  {
    number: '04',
    title: 'Practice Interviews',
    subtitle: 'Adaptive AI simulations',
    variant: 'stepOrange',
    icon: <MessageSquare size={22} strokeWidth={2} />,
  },
];

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

          <div className={styles.workflowSteps} role="list" aria-label="CareerLens 4-step sequence">
            {STEPS.map((step) => (
              <div
                key={step.number}
                className={`${styles.stepCard} ${styles[step.variant]}`}
                role="listitem"
                tabIndex={0}
              >
                <div className={styles.stepHeader}>
                  <span className={styles.stepNumber}>{step.number}</span>
                  <span className={styles.stepIcon}>{step.icon}</span>
                </div>
                <div className={styles.stepTitle}>{step.title}</div>
                <div className={styles.stepSubtitle}>{step.subtitle}</div>
              </div>
            ))}
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
