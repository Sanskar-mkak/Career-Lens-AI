import React from 'react';
import { FileText, Crosshair, Mic, TrendingUp } from 'lucide-react';
import styles from '../LandingPage.module.css';

interface FeatureItem {
  id: 'resume' | 'jobMatch' | 'interview' | 'skillGap';
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  iconBorder: string;
  iconGlow: string;
  title: string;
  description: string;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'resume',
    icon: <FileText size={28} strokeWidth={2} />,
    iconBg: 'rgba(37, 99, 235, 0.12)',
    iconColor: '#2563eb',
    iconBorder: 'rgba(37, 99, 235, 0.25)',
    iconGlow: 'rgba(37, 99, 235, 0.2)',
    title: 'Resume Intelligence',
    description: 'Get detailed feedback and improve your resume with structured analysis.',
  },
  {
    id: 'jobMatch',
    icon: <Crosshair size={28} strokeWidth={2} />,
    iconBg: 'rgba(16, 185, 129, 0.12)',
    iconColor: '#10b981',
    iconBorder: 'rgba(16, 185, 129, 0.25)',
    iconGlow: 'rgba(16, 185, 129, 0.2)',
    title: 'Job Matching',
    description: 'Compare your resume with real job requirements and identify alignment.',
  },
  {
    id: 'interview',
    icon: <Mic size={28} strokeWidth={2} />,
    iconBg: 'rgba(139, 92, 246, 0.12)',
    iconColor: '#8b5cf6',
    iconBorder: 'rgba(139, 92, 246, 0.25)',
    iconGlow: 'rgba(139, 92, 246, 0.2)',
    title: 'AI Mock Interviews',
    description: 'Practice with realistic, adaptive interview sessions.',
  },
  {
    id: 'skillGap',
    icon: <TrendingUp size={28} strokeWidth={2} />,
    iconBg: 'rgba(245, 158, 11, 0.12)',
    iconColor: '#f59e0b',
    iconBorder: 'rgba(245, 158, 11, 0.25)',
    iconGlow: 'rgba(245, 158, 11, 0.2)',
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
          {FEATURES.map((feature) => (
            <div
              key={feature.id}
              className={`${styles.featureCard} ${styles[`featureCard_${feature.id}`]}`}
              tabIndex={0}
              role="article"
              aria-label={feature.title}
            >
              <div
                className={styles.featureIconWrapper}
                style={{
                  backgroundColor: feature.iconBg,
                  color: feature.iconColor,
                  borderColor: feature.iconBorder,
                  boxShadow: `0 4px 14px ${feature.iconGlow}`,
                }}
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
