import React from 'react';
import { FileText, Crosshair, Mic, TrendingUp } from 'lucide-react';
import styles from '../LandingPage.module.css';

interface FeatureItem {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    icon: <FileText size={24} />,
    iconBg: 'rgba(0, 102, 255, 0.12)',
    iconColor: 'var(--color-primary)',
    title: 'Resume Intelligence',
    description: 'Get detailed feedback and improve your resume with structured analysis.',
  },
  {
    icon: <Crosshair size={24} />,
    iconBg: 'rgba(16, 185, 129, 0.12)',
    iconColor: 'var(--color-success)',
    title: 'Job Matching',
    description: 'Compare your resume with real job requirements and identify alignment.',
  },
  {
    icon: <Mic size={24} />,
    iconBg: 'rgba(139, 92, 246, 0.12)',
    iconColor: '#8B5CF6',
    title: 'AI Mock Interviews',
    description: 'Practice with realistic, adaptive interview sessions.',
  },
  {
    icon: <TrendingUp size={24} />,
    iconBg: 'rgba(245, 158, 11, 0.12)',
    iconColor: 'var(--color-warning)',
    title: 'Skill Gap & Roadmap',
    description: 'Compare resume evidence against target roles and identify areas to improve.',
  },
];

export const FeatureGrid: React.FC = () => {
  return (
    <section id="features" className={styles.featuresSection} aria-labelledby="features-heading">
      <div className={styles.contentWrapper}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionOverline}>Core Capabilities</div>
          <h2 id="features-heading" className={styles.sectionTitle}>
            Everything You Need to Advance Your Career
          </h2>
          <p className={styles.sectionSubtitle}>
            Four interconnected modules designed to take you from resume analysis to interview confidence.
          </p>
        </div>

        <div className={styles.featureGrid}>
          {FEATURES.map((feature, idx) => (
            <div key={idx} className={styles.featureCard} tabIndex={0}>
              <div
                className={styles.featureIconWrapper}
                style={{ backgroundColor: feature.iconBg, color: feature.iconColor }}
                aria-hidden="true"
              >
                {feature.icon}
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureGrid;
