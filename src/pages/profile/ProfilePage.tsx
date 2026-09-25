/**
 * CareerLens AI — Candidate Profile Page
 *
 * Route: /profile
 * Visual Reference: Website Look/Profiles.png
 *
 * Candidate profile management, background credentials, skills inventory,
 * career targets, and platform preferences. Local frontend UI state.
 */

import React, { useState, useRef } from 'react';
import {
  User,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  Award,
  CheckCircle2,
  Circle,
  Plus,
  Trash2,
  Edit3,
  ExternalLink,
  Code2,
  FolderGit2,
  Sliders,
  Check,
  Camera,
  X,
} from 'lucide-react';
import { MascotCanvas } from '@/mascot';
import styles from './ProfilePage.module.css';

const GitHubIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  </svg>
);

type ActiveTab = 'overview' | 'personal' | 'education' | 'skills' | 'projects' | 'preferences';

interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  field: string;
  gradYear: string;
  gpa?: string;
}

interface ProjectItem {
  id: string;
  name: string;
  role: string;
  description: string;
  technologies: string[];
  link?: string;
}

export const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');

  // Personal details state
  const [fullName, setFullName] = useState('Sanskar Prajapati');
  const [title, setTitle] = useState('Full Stack Software Engineer');
  const [email, setEmail] = useState('sanskar@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [location, setLocation] = useState('San Francisco, CA');
  const [portfolio, setPortfolio] = useState('https://sanskar.dev');
  const [github, setGithub] = useState('https://github.com/sanskar');
  const [linkedin, setLinkedin] = useState('https://linkedin.com/in/sanskar');
  const [bio, setBio] = useState(
    'Passionate Full Stack Engineer focused on building scalable, user-centric web applications with React, TypeScript, and modern backend architectures. Dedicated to clean code, robust performance, and continuous growth.'
  );

  // Career Goals
  const [targetRole, setTargetRole] = useState('Senior Full Stack Engineer');
  const [targetIndustry, setTargetIndustry] = useState('Technology / SaaS');
  const [targetLocation, setTargetLocation] = useState('Remote / Hybrid');
  const [targetTimeline, setTargetTimeline] = useState('Immediate (Next 30–60 days)');

  // Preferences
  const [searchStatus, setSearchStatus] = useState('actively-looking');
  const [workModelRemote, setWorkModelRemote] = useState(true);
  const [workModelHybrid, setWorkModelHybrid] = useState(true);
  const [workModelOnsite, setWorkModelOnsite] = useState(false);
  const [desiredComp, setDesiredComp] = useState('$130,000 – $160,000 USD');

  // Notification / saved state toast
  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  // Profile picture upload / preview state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setSavedFeedback('Please select a valid image file (PNG, JPG, JPEG, WEBP).');
        setTimeout(() => setSavedFeedback(null), 3000);
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setProfileImage(event.target.result as string);
          setSavedFeedback('Profile picture updated locally.');
          setTimeout(() => setSavedFeedback(null), 3000);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setProfileImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setSavedFeedback('Profile picture reset to default avatar.');
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  // Skills state
  const [frontendSkills, setFrontendSkills] = useState<string[]>(['React', 'TypeScript', 'Next.js', 'CSS Modules', 'Tailwind CSS']);
  const [backendSkills, setBackendSkills] = useState<string[]>(['Node.js', 'Express', 'Python', 'PostgreSQL', 'REST APIs']);
  const [toolsSkills, setToolsSkills] = useState<string[]>(['Git & GitHub', 'Docker', 'AWS', 'Jest', 'CI/CD Pipelines']);
  const [newSkillInput, setNewSkillInput] = useState('');
  const [skillCategory, setSkillCategory] = useState<'frontend' | 'backend' | 'tools'>('frontend');

  // Education items
  const educationList: EducationItem[] = [
    {
      id: 'edu_1',
      degree: 'Bachelor of Science',
      institution: 'University of California, Berkeley',
      field: 'Computer Science',
      gradYear: '2023',
      gpa: '3.8 / 4.0',
    },
  ];

  // Projects items
  const projectList: ProjectItem[] = [
    {
      id: 'proj_1',
      name: 'CareerLens AI',
      role: 'Lead Frontend & Product Engineer',
      description:
        'Engineered an intelligent career co-pilot platform featuring resume analysis, interactive interview simulations, and opportunity tracking.',
      technologies: ['React', 'TypeScript', 'Vite', 'CSS Modules', 'Lucide Icons'],
      link: 'https://careerlens.ai',
    },
    {
      id: 'proj_2',
      name: 'Distributed Cloud Task Orchestrator',
      role: 'Full Stack Engineer',
      description:
        'Architected a resilient distributed worker queue processing background tasks with real-time status dashboards and automatic retries.',
      technologies: ['Node.js', 'Redis', 'Docker', 'PostgreSQL'],
      link: 'https://github.com/sanskar/cloud-orchestrator',
    },
  ];

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback('Personal information saved locally.');
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  const handleSavePreferences = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedFeedback('Career preferences updated successfully.');
    setTimeout(() => setSavedFeedback(null), 3000);
  };

  const handleAddSkill = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillInput.trim()) return;
    const clean = newSkillInput.trim();
    if (skillCategory === 'frontend' && !frontendSkills.includes(clean)) {
      setFrontendSkills([...frontendSkills, clean]);
    } else if (skillCategory === 'backend' && !backendSkills.includes(clean)) {
      setBackendSkills([...backendSkills, clean]);
    } else if (skillCategory === 'tools' && !toolsSkills.includes(clean)) {
      setToolsSkills([...toolsSkills, clean]);
    }
    setNewSkillInput('');
  };

  const handleRemoveSkill = (category: 'frontend' | 'backend' | 'tools', skillToRemove: string) => {
    if (category === 'frontend') {
      setFrontendSkills(frontendSkills.filter((s: string) => s !== skillToRemove));
    } else if (category === 'backend') {
      setBackendSkills(backendSkills.filter((s: string) => s !== skillToRemove));
    } else {
      setToolsSkills(toolsSkills.filter((s: string) => s !== skillToRemove));
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* --- Profile Header Card --- */}
      <section className={styles.profileHeaderCard}>
        <div className={styles.profileInfoLeft}>
          <div className={styles.avatarContainer}>
            {profileImage ? (
              <img
                src={profileImage}
                alt={`${fullName}'s profile`}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.avatarBadge} aria-label="Profile Avatar">
                SP
              </div>
            )}

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/png, image/jpeg, image/webp"
              style={{ display: 'none' }}
              onChange={handleFileChange}
              aria-label="Upload profile image"
            />

            {/* Circular Camera Edit Button overlaid at bottom-right (WhatsApp style) */}
            <button
              type="button"
              className={styles.cameraOverlayBtn}
              onClick={handleImageClick}
              title="Change profile picture"
              aria-label="Change profile picture"
            >
              <Camera size={16} />
            </button>

            {/* If custom image selected, show small remove/reset button */}
            {profileImage && (
              <button
                type="button"
                className={styles.removeImageBtn}
                onClick={handleRemoveImage}
                title="Reset to default avatar"
                aria-label="Reset to default avatar"
              >
                <X size={12} />
              </button>
            )}
          </div>

          <div className={styles.profileDetails}>
            <div className={styles.profileNameRow}>
              <h1 className={styles.profileName}>{fullName}</h1>
              <span className={styles.statusPill}>
                <span className={styles.statusDot} />
                {searchStatus === 'actively-looking' ? 'Actively Looking' : 'Open to Offers'}
              </span>
            </div>
            <div className={styles.profileTitle}>{title}</div>

            <div className={styles.profileMetaLinks}>
              <span className={styles.metaItem}>
                <MapPin size={13} />
                {location}
              </span>
              <span className={styles.metaItem}>
                <Mail size={13} />
                {email}
              </span>
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className={styles.metaItem}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <GitHubIcon />
                GitHub
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className={styles.metaItem}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                <LinkedInIcon />
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Mascot Container */}
        <div className={styles.headerMascotArea} aria-hidden="true">
          <div className={styles.mascotCanvasBox}>
            <MascotCanvas
              semanticState="IDLE"
              cameraPreset="compact"
              transparent
              showPlatform={false}
            />
          </div>
        </div>
      </section>

      {/* --- Tabs Navigation Bar --- */}
      <nav className={styles.tabNavigation} aria-label="Profile Navigation Tabs">
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'overview' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          <Sparkles size={16} />
          Overview
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'personal' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('personal')}
        >
          <User size={16} />
          Personal Info
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'skills' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('skills')}
        >
          <Code2 size={16} />
          Skills Inventory
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'education' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('education')}
        >
          <GraduationCap size={16} />
          Education
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'projects' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('projects')}
        >
          <FolderGit2 size={16} />
          Projects
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'preferences' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('preferences')}
        >
          <Sliders size={16} />
          Preferences
        </button>
      </nav>

      {/* --- Saved Feedback Notification --- */}
      {savedFeedback && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '12px 16px',
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            color: '#10b981',
            fontSize: 'var(--font-size-sm)',
            fontWeight: 600,
          }}
        >
          <Check size={16} />
          {savedFeedback}
        </div>
      )}

      {/* --- TAB 1: OVERVIEW --- */}
      {activeTab === 'overview' && (
        <div className={styles.overviewLayout}>
          <div className={styles.overviewMain}>
            {/* Career Goals Card */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>
                    <Briefcase size={18} color="var(--color-primary)" />
                    Career Targets
                  </h2>
                  <span className={styles.sectionSubtitle}>
                    Parameters used to guide AI job matching and interview questions
                  </span>
                </div>
                <button
                  type="button"
                  className={styles.tabBtn}
                  style={{ fontSize: 'var(--font-size-xs)', padding: '6px 12px' }}
                  onClick={() => setActiveTab('preferences')}
                >
                  <Edit3 size={14} />
                  Adjust
                </button>
              </div>

              <div className={styles.goalsGrid}>
                <div className={styles.goalItem}>
                  <span className={styles.goalLabel}>Target Role</span>
                  <span className={styles.goalValue}>{targetRole}</span>
                </div>
                <div className={styles.goalItem}>
                  <span className={styles.goalLabel}>Target Industry</span>
                  <span className={styles.goalValue}>{targetIndustry}</span>
                </div>
                <div className={styles.goalItem}>
                  <span className={styles.goalLabel}>Work Model</span>
                  <span className={styles.goalValue}>{targetLocation}</span>
                </div>
                <div className={styles.goalItem}>
                  <span className={styles.goalLabel}>Search Timeline</span>
                  <span className={styles.goalValue}>{targetTimeline}</span>
                </div>
              </div>
            </div>

            {/* Platform Stats Row */}
            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <span className={styles.statVal}>0</span>
                <span className={styles.statLbl}>Applications Tracked</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statVal}>0</span>
                <span className={styles.statLbl}>Interviews Practiced</span>
              </div>
              <div className={styles.statCard}>
                <span className={styles.statVal}>Active</span>
                <span className={styles.statLbl}>Profile State</span>
              </div>
            </div>

            {/* About / Summary Card */}
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h2 className={styles.sectionTitle}>
                  <User size={18} color="var(--color-primary)" />
                  Candidate Summary
                </h2>
                <button
                  type="button"
                  className={styles.tabBtn}
                  style={{ fontSize: 'var(--font-size-xs)', padding: '6px 12px' }}
                  onClick={() => setActiveTab('personal')}
                >
                  <Edit3 size={14} />
                  Edit Bio
                </button>
              </div>
              <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                {bio}
              </p>
            </div>
          </div>

          {/* Right Sidebar: Profile Completeness */}
          <aside className={styles.overviewSide}>
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <h3 className={styles.sectionTitle}>Profile Strength</h3>
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  66% Complete
                </span>
              </div>

              <div className={styles.checklistProgress}>
                <div className={styles.progressBarTrack}>
                  <div className={styles.progressBarFill} style={{ width: '66%' }} />
                </div>
              </div>

              <div className={styles.checklistItems}>
                <div className={`${styles.checkItem} ${styles.checkItemDone}`}>
                  <span>Primary Identity & Bio</span>
                  <CheckCircle2 size={16} className={styles.checkIconDone} />
                </div>
                <div className={`${styles.checkItem} ${styles.checkItemDone}`}>
                  <span>Contact & Social Links</span>
                  <CheckCircle2 size={16} className={styles.checkIconDone} />
                </div>
                <div className={`${styles.checkItem} ${styles.checkItemDone}`}>
                  <span>Target Career Goals</span>
                  <CheckCircle2 size={16} className={styles.checkIconDone} />
                </div>
                <div className={`${styles.checkItem} ${styles.checkItemDone}`}>
                  <span>Core Tech Stack Skills</span>
                  <CheckCircle2 size={16} className={styles.checkIconDone} />
                </div>
                <div className={styles.checkItem}>
                  <span>First Resume Analyzed</span>
                  <Circle size={16} className={styles.checkIconPending} />
                </div>
                <div className={styles.checkItem}>
                  <span>Mock Interview Completed</span>
                  <Circle size={16} className={styles.checkIconPending} />
                </div>
              </div>
            </div>

            <div className={styles.sectionCard}>
              <h3 className={styles.sectionTitle}>
                <Award size={16} color="var(--color-accent)" />
                Activity Records
              </h3>
              <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                Your activity history tracks resume analyses, interview scores, and application updates as you engage with CareerLens AI tools.
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* --- TAB 2: PERSONAL INFO --- */}
      {activeTab === 'personal' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Personal & Contact Information</h2>
              <span className={styles.sectionSubtitle}>
                Update your contact details and publicly visible profile info
              </span>
            </div>
          </div>

          <form onSubmit={handleSavePersonalInfo}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Full Name</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Professional Headline</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Email Address</label>
                <input
                  type="email"
                  className={styles.formInput}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Phone Number</label>
                <input
                  type="tel"
                  className={styles.formInput}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Location</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Personal Portfolio / Website</label>
                <input
                  type="url"
                  className={styles.formInput}
                  value={portfolio}
                  onChange={(e) => setPortfolio(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>GitHub Profile URL</label>
                <input
                  type="url"
                  className={styles.formInput}
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>LinkedIn Profile URL</label>
                <input
                  type="url"
                  className={styles.formInput}
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.inputLabel}>Professional Summary / Bio</label>
                <textarea
                  rows={4}
                  className={styles.formTextarea}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.saveBtnRow}>
              <button type="submit" className={styles.saveButton}>
                Save Changes
              </button>
            </div>
          </form>
        </div>
      )}

      {/* --- TAB 3: SKILLS INVENTORY --- */}
      {activeTab === 'skills' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Skills Inventory</h2>
              <span className={styles.sectionSubtitle}>
                Add or remove technical competencies to benchmark against job descriptions
              </span>
            </div>
          </div>

          <form onSubmit={handleAddSkill} className={styles.addSkillRow}>
            <input
              type="text"
              className={styles.formInput}
              placeholder="e.g. GraphQL, Kubernetes"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
            />
            <select
              className={styles.formSelect}
              value={skillCategory}
              onChange={(e) => setSkillCategory(e.target.value as 'frontend' | 'backend' | 'tools')}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Cloud / Tools</option>
            </select>
            <button type="submit" className={styles.saveButton} style={{ padding: '9px 16px' }}>
              <Plus size={16} />
            </button>
          </form>

          <div className={styles.skillsCategories}>
            <div>
              <div className={styles.skillsGroupTitle}>Frontend Technologies</div>
              <div className={styles.skillsPillList}>
                {frontendSkills.map((skill: string) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                    <button
                      type="button"
                      className={styles.skillRemoveBtn}
                      onClick={() => handleRemoveSkill('frontend', skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.skillsGroupTitle}>Backend & Database</div>
              <div className={styles.skillsPillList}>
                {backendSkills.map((skill: string) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                    <button
                      type="button"
                      className={styles.skillRemoveBtn}
                      onClick={() => handleRemoveSkill('backend', skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <div className={styles.skillsGroupTitle}>DevOps, Cloud & Architecture</div>
              <div className={styles.skillsPillList}>
                {toolsSkills.map((skill: string) => (
                  <span key={skill} className={styles.skillPill}>
                    {skill}
                    <button
                      type="button"
                      className={styles.skillRemoveBtn}
                      onClick={() => handleRemoveSkill('tools', skill)}
                      aria-label={`Remove ${skill}`}
                    >
                      <Trash2 size={12} />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB 4: EDUCATION --- */}
      {activeTab === 'education' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Education Credentials</h2>
              <span className={styles.sectionSubtitle}>
                Academic background, degrees, and institutions
              </span>
            </div>
          </div>

          <div className={styles.itemsList}>
            {educationList.map((edu) => (
              <div key={edu.id} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <div>
                    <div className={styles.itemMainTitle}>{edu.degree} — {edu.field}</div>
                    <div className={styles.itemSubtitle}>{edu.institution}</div>
                  </div>
                  <div className={styles.itemPeriod}>Graduated {edu.gradYear}</div>
                </div>
                {edu.gpa && (
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Cumulative GPA: {edu.gpa}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 5: PROJECTS --- */}
      {activeTab === 'projects' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Featured Projects</h2>
              <span className={styles.sectionSubtitle}>
                Showcase engineering achievements and portfolio initiatives
              </span>
            </div>
          </div>

          <div className={styles.itemsList}>
            {projectList.map((proj) => (
              <div key={proj.id} className={styles.itemCard}>
                <div className={styles.itemHeader}>
                  <div>
                    <div className={styles.itemMainTitle}>{proj.name}</div>
                    <div className={styles.itemSubtitle}>{proj.role}</div>
                  </div>
                  {proj.link && (
                    <a
                      href={proj.link}
                      target="_blank"
                      rel="noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: 'var(--font-size-xs)', color: 'var(--color-primary)' }}
                    >
                      View Link
                      <ExternalLink size={12} />
                    </a>
                  )}
                </div>
                <div className={styles.itemDesc}>{proj.description}</div>
                <div className={styles.tagList}>
                  {proj.technologies.map((tech) => (
                    <span key={tech} className={styles.techTag}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- TAB 6: PREFERENCES --- */}
      {activeTab === 'preferences' && (
        <div className={styles.sectionCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2 className={styles.sectionTitle}>Job Search & Work Preferences</h2>
              <span className={styles.sectionSubtitle}>
                Define your ideal role conditions, compensation expectations, and work models
              </span>
            </div>
          </div>

          <form onSubmit={handleSavePreferences}>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Current Search Status</label>
                <select
                  className={styles.formSelect}
                  value={searchStatus}
                  onChange={(e) => setSearchStatus(e.target.value)}
                >
                  <option value="actively-looking">Actively Looking (Ready for interviews)</option>
                  <option value="open-to-offers">Open to Offers (Passive candidate)</option>
                  <option value="not-looking">Not Looking Currently</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Target Compensation Range</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={desiredComp}
                  onChange={(e) => setDesiredComp(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Target Role Title</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Target Industry</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={targetIndustry}
                  onChange={(e) => setTargetIndustry(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Work Model / Location</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={targetLocation}
                  onChange={(e) => setTargetLocation(e.target.value)}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.inputLabel}>Target Search Timeline</label>
                <input
                  type="text"
                  className={styles.formInput}
                  value={targetTimeline}
                  onChange={(e) => setTargetTimeline(e.target.value)}
                />
              </div>

              <div className={styles.formGroupFull}>
                <label className={styles.inputLabel} style={{ marginBottom: 'var(--space-2)' }}>
                  Preferred Work Arrangements
                </label>
                <div className={styles.checkboxGroup}>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={workModelRemote}
                      onChange={(e) => setWorkModelRemote(e.target.checked)}
                    />
                    <span>Remote (Work from anywhere)</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={workModelHybrid}
                      onChange={(e) => setWorkModelHybrid(e.target.checked)}
                    />
                    <span>Hybrid (1–3 days in-office)</span>
                  </label>
                  <label className={styles.checkboxLabel}>
                    <input
                      type="checkbox"
                      checked={workModelOnsite}
                      onChange={(e) => setWorkModelOnsite(e.target.checked)}
                    />
                    <span>On-site (Full-time office location)</span>
                  </label>
                </div>
              </div>
            </div>

            <div className={styles.saveBtnRow}>
              <button type="submit" className={styles.saveButton}>
                Save Preferences
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
