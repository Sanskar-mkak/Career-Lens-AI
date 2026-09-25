/**
 * CareerLens AI — Job Match Page
 *
 * Phase 5 Batch: Target Job Collection & Comparison Workflow
 * Visual Reference: Website Look/JOB Match.png
 *
 * Frontend UI for entering target job details to compare against the active resume.
 * Validation ensures required fields are entered before advancing to /skill-gap.
 */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Briefcase,
  MapPin,
  FileText,
  CheckCircle2,
  Sparkles,
  Target,
  Users,
  Compass,
  ArrowRight,
  X,
  AlertCircle,
} from 'lucide-react';
import { MascotCanvas } from '@/mascot';
import { ROUTES } from '@/app/routes/routes';
import styles from './JobMatchPage.module.css';

interface PopularRole {
  company: string;
  title: string;
  location: string;
  experience: string;
  jobType: string;
  description: string;
}

const POPULAR_ROLES: PopularRole[] = [
  {
    company: 'Google',
    title: 'Software Engineer',
    location: 'Bengaluru, India',
    experience: '2 – 5 years',
    jobType: 'Full-time',
    description:
      'We are looking for a Software Engineer to design, develop, test, deploy, and maintain large-scale software solutions. Proficiency in data structures, algorithms, and distributed systems is required.',
  },
  {
    company: 'Microsoft',
    title: 'Backend Developer',
    location: 'Remote',
    experience: '2 – 5 years',
    jobType: 'Full-time',
    description:
      'Join our Cloud & AI organization as a Backend Developer. Responsible for building resilient microservices, REST APIs, and database schemas with strong emphasis on scalability and security.',
  },
  {
    company: 'Amazon',
    title: 'SDE II',
    location: 'Bengaluru, India',
    experience: '3 – 6 years',
    jobType: 'Full-time',
    description:
      'Amazon is seeking an experienced Software Development Engineer II. You will lead architectural reviews, mentor engineers, and build high-throughput distributed architectures.',
  },
  {
    company: 'Spotify',
    title: 'Full Stack Engineer',
    location: 'Remote',
    experience: '2 – 5 years',
    jobType: 'Full-time',
    description:
      'Help build seamless audio experiences for millions of creators worldwide. Strong expertise in TypeScript, React, Node.js, and containerized deployments needed.',
  },
];

export const JobMatchPage: React.FC = () => {
  const navigate = useNavigate();

  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('2 – 5 years');
  const [jobType, setJobType] = useState('Full-time');
  const [jobDescription, setJobDescription] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleClearAll = () => {
    setCompany('');
    setJobTitle('');
    setLocation('');
    setExperience('2 – 5 years');
    setJobType('Full-time');
    setJobDescription('');
    setValidationError(null);
  };

  const handleSelectPopularRole = (role: PopularRole) => {
    setCompany(role.company);
    setJobTitle(role.title);
    setLocation(role.location);
    setExperience(role.experience);
    setJobType(role.jobType);
    setJobDescription(role.description);
    setValidationError(null);
  };

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);

    if (!company.trim()) {
      setValidationError('Please enter a target company name.');
      return;
    }
    if (!jobTitle.trim()) {
      setValidationError('Please enter a target job title or role.');
      return;
    }
    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      setValidationError('Please provide a job description (at least 20 characters) for matching.');
      return;
    }

    // Navigate to Skill Gap analysis page
    navigate(ROUTES.SKILL_GAP);
  };

  return (
    <div className={styles.pageContainer}>
      {/* ── Section 1: Hero Header Banner ── */}
      <section className={styles.heroBanner} aria-label="Job Match Overview">
        <div className={styles.heroContent}>
          <span className={styles.heroEyebrow}>Job Match</span>
          <h1 className={styles.heroHeadline}>
            Find Your <span className={styles.headlineAccent}>Next Opportunity</span>
          </h1>
          <p className={styles.heroSubtitle}>
            Add a target job description and compare it against your active resume. Discover role
            fit, required skills, and personalized gaps.
          </p>
        </div>

        {/* Mascot Container (Visual footprint matching JOB Match.png) */}
        <div className={styles.heroMascotArea} aria-hidden="true">
          <div className={styles.speechBubble}>
            Let&rsquo;s see how well you match this role!
          </div>
          <div className={styles.mascotCanvasBox}>
            <MascotCanvas
              semanticState={validationError ? 'WARNING' : jobDescription.length > 20 ? 'FOCUSED' : 'CURIOUS'}
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

      {/* ── Section 2: Main Two-Column Layout (Form & Sidebar) ── */}
      <div className={styles.matchGrid}>
        {/* Left Column: Job Details Form */}
        <form className={styles.formCard} onSubmit={handleAnalyze} noValidate>
          <div className={styles.formHeader}>
            <div>
              <h2 className={styles.formTitle}>Job Details</h2>
              <p className={styles.formSubtitle}>
                Enter the target job information or paste the job description below.
              </p>
            </div>
            <button
              type="button"
              onClick={handleClearAll}
              className={styles.clearBtn}
              aria-label="Clear all form fields"
            >
              Clear All
            </button>
          </div>

          {/* Validation Alert */}
          {validationError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.625rem',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-danger-bg)',
                border: '1px solid var(--color-danger)',
                color: 'var(--color-danger)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
              }}
              role="alert"
            >
              <AlertCircle size={16} aria-hidden="true" />
              <span>{validationError}</span>
            </div>
          )}

          {/* Row 1: Company & Job Title */}
          <div className={styles.fieldsGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="company-name" className={styles.label}>
                Company <span className={styles.requiredMark}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <Briefcase size={16} />
                </span>
                <input
                  id="company-name"
                  type="text"
                  placeholder="e.g. Google, Microsoft"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={styles.input}
                  aria-required="true"
                />
                {company && (
                  <button
                    type="button"
                    onClick={() => setCompany('')}
                    style={{
                      position: 'absolute',
                      right: '0.75rem',
                      background: 'none',
                      border: 'none',
                      color: 'var(--color-text-muted)',
                      cursor: 'pointer',
                    }}
                    aria-label="Clear company field"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="job-title" className={styles.label}>
                Job Title <span className={styles.requiredMark}>*</span>
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <FileText size={16} />
                </span>
                <input
                  id="job-title"
                  type="text"
                  placeholder="e.g. Software Engineer"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className={styles.input}
                  aria-required="true"
                />
              </div>
            </div>
          </div>

          {/* Row 2: Location & Experience Level */}
          <div className={styles.fieldsGrid}>
            <div className={styles.inputGroup}>
              <label htmlFor="job-location" className={styles.label}>
                Location
              </label>
              <div className={styles.inputWrapper}>
                <span className={styles.inputIcon} aria-hidden="true">
                  <MapPin size={16} />
                </span>
                <input
                  id="job-location"
                  type="text"
                  placeholder="e.g. Bengaluru, India or Remote"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="experience-level" className={styles.label}>
                Experience Level
              </label>
              <select
                id="experience-level"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                className={styles.selectInput}
              >
                <option value="Entry Level (0–2 yrs)">Entry Level (0–2 yrs)</option>
                <option value="2 – 5 years">2 – 5 years</option>
                <option value="5 – 8 years">5 – 8 years</option>
                <option value="8+ years">8+ years</option>
              </select>
            </div>
          </div>

          {/* Row 3: Job Type */}
          <div className={styles.inputGroup}>
            <label htmlFor="job-type" className={styles.label}>
              Job Type
            </label>
            <select
              id="job-type"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className={styles.selectInput}
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Row 4: Job Description */}
          <div className={styles.descriptionContainer}>
            <div className={styles.descTabsHeader}>
              <label htmlFor="job-description" className={styles.label}>
                Job Description <span className={styles.requiredMark}>*</span>
              </label>
              <div className={styles.descTabs}>
                <button
                  type="button"
                  className={`${styles.descTab} ${styles.descTabActive}`}
                >
                  Paste Text
                </button>
              </div>
            </div>

            <textarea
              id="job-description"
              className={styles.textarea}
              placeholder="Paste the complete job description, responsibilities, and requirements here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              maxLength={5000}
              aria-required="true"
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <span className={styles.charCount}>{jobDescription.length} / 5000</span>
            </div>
          </div>

          {/* Helpful Tip */}
          <div className={styles.tipBanner} aria-label="Tip for job matching">
            <span role="img" aria-label="lightbulb">💡</span>
            <span>
              <strong>Tip:</strong> Include the entire qualification and requirements section for
              the most comprehensive skill-gap comparison.
            </span>
          </div>

          {/* Submit CTA */}
          <button type="submit" className={styles.analyzeBtn}>
            <span>Analyze Job Match</span>
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </form>

        {/* Right Column: Active Resume & Value Proposition */}
        <div className={styles.rightColumn}>
          {/* Active Resume Card */}
          <div className={styles.activeResumeCard}>
            <div className={styles.cardHeaderRow}>
              <h3 className={styles.cardTitle}>Your Active Resume</h3>
              <Link to={ROUTES.RESUME} className={styles.changeLink}>
                Change
              </Link>
            </div>

            <div className={styles.resumeFileBox}>
              <div className={styles.resumeIconBadge} aria-hidden="true">
                PDF
              </div>
              <div className={styles.resumeMetaText}>
                <span className={styles.resumeName}>Sanskar_Resume_Master.pdf</span>
                <span className={styles.resumeDate}>Active in Workspace</span>
              </div>
            </div>

            <div className={styles.readyStatusPill}>
              <CheckCircle2 size={16} style={{ flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
              <span>
                <strong>Ready for comparison:</strong> This active resume will be benchmarked against
                the job qualifications you submit.
              </span>
            </div>
          </div>

          {/* Why Job Match Card */}
          <div className={styles.whyCard}>
            <h3 className={styles.cardTitle}>Why Job Match?</h3>
            <ul className={styles.whyList}>
              <li className={styles.whyItem}>
                <div className={styles.whyIconWrapper} aria-hidden="true">
                  <Target size={16} />
                </div>
                <div className={styles.whyText}>
                  <span className={styles.whyTitle}>See how well you fit</span>
                  <span className={styles.whyDesc}>
                    Get a clear breakdown of qualifications and requirements coverage.
                  </span>
                </div>
              </li>

              <li className={styles.whyItem}>
                <div className={styles.whyIconWrapper} aria-hidden="true">
                  <Sparkles size={16} />
                </div>
                <div className={styles.whyText}>
                  <span className={styles.whyTitle}>Identify missing skills</span>
                  <span className={styles.whyDesc}>
                    Know exactly which technologies and domain areas need stronger evidence.
                  </span>
                </div>
              </li>

              <li className={styles.whyItem}>
                <div className={styles.whyIconWrapper} aria-hidden="true">
                  <Compass size={16} />
                </div>
                <div className={styles.whyText}>
                  <span className={styles.whyTitle}>Tailored recommendations</span>
                  <span className={styles.whyDesc}>
                    Receive prioritized learning steps to bridge competitive skill gaps.
                  </span>
                </div>
              </li>

              <li className={styles.whyItem}>
                <div className={styles.whyIconWrapper} aria-hidden="true">
                  <Users size={16} />
                </div>
                <div className={styles.whyText}>
                  <span className={styles.whyTitle}>Stand out in applications</span>
                  <span className={styles.whyDesc}>
                    Align your resume keywords with specific job requirements before applying.
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Section 3: Example Role Templates Quick-Pick ── */}
      <section className={styles.popularSection} aria-label="Example role templates for input convenience">
        <div className={styles.popularHeader}>
          <div>
            <h2 className={styles.popularTitle}>Example Role Templates</h2>
            <p className={styles.popularSubtitle}>
              Select a sample template below to quickly test the matching input form without typing.
            </p>
          </div>
        </div>

        <div className={styles.rolesGrid}>
          {POPULAR_ROLES.map((role) => (
            <button
              key={`${role.company}-${role.title}`}
              type="button"
              className={styles.roleCard}
              onClick={() => handleSelectPopularRole(role)}
              aria-label={`Select ${role.title} at ${role.company}`}
            >
              <div className={styles.roleCardTop}>
                <div className={styles.roleCompanyIcon} aria-hidden="true">
                  {role.company[0]}
                </div>
                <span className={styles.roleCompanyName}>{role.company}</span>
              </div>

              <h3 className={styles.roleTitle}>{role.title}</h3>

              <div className={styles.roleMeta}>
                <span>📍 {role.location}</span>
                <span>🕒 {role.experience}</span>
              </div>

              <div className={styles.roleCardBottom}>
                <ArrowRight size={14} aria-hidden="true" />
              </div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default JobMatchPage;
