/**
 * CareerLens AI — Settings Page
 *
 * Route: /settings
 * Visual Reference: Website Look/Setting.png
 *
 * Configures user account settings, theme/appearance via ThemeContext,
 * notification preferences, privacy parameters, and AI coach behavior.
 */

import React, { useState } from 'react';
import {
  User,
  Palette,
  Bell,
  Shield,
  Sparkles,
  Sun,
  Moon,
  Check,
  Laptop,
  Download,
  AlertTriangle,
  ExternalLink,
  HelpCircle,
  Crown,
  KeyRound,
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { MascotCanvas } from '@/mascot';
import styles from './SettingsPage.module.css';

type SettingsTab = 'account' | 'appearance' | 'notifications' | 'privacy' | 'ai';

export const SettingsPage: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState<SettingsTab>('account');

  // Account form state
  const [displayName, setDisplayName] = useState('Sanskar Prajapati');
  const [email, setEmail] = useState('sanskar@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [jobTitle, setJobTitle] = useState('Full Stack Software Engineer');

  // Password state
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Density preference
  const [density, setDensity] = useState<'comfortable' | 'compact'>('comfortable');

  // Notification toggles
  const [notifyAppStatus, setNotifyAppStatus] = useState(true);
  const [notifyInterviewSummary, setNotifyInterviewSummary] = useState(true);
  const [notifyWeeklyDigest, setNotifyWeeklyDigest] = useState(false);
  const [notifyProductTips, setNotifyProductTips] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);

  // Privacy toggles
  const [allowAnonymizedData, setAllowAnonymizedData] = useState(true);
  const [recruiterVisibility, setRecruiterVisibility] = useState(false);

  // AI Preferences
  const [feedbackDepth, setFeedbackDepth] = useState<'concise' | 'balanced' | 'comprehensive'>('balanced');
  const [coachTone, setCoachTone] = useState<'rigorous' | 'encouraging' | 'technical'>('rigorous');
  const [autoAnalyzeJD, setAutoAnalyzeJD] = useState(true);

  // Toast / Feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Account details updated successfully.');
  };

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      showToast('Please fill out all password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      showToast('New passwords do not match.');
      return;
    }
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    showToast('Password updated successfully.');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      showToast('Account deletion requested. (Action simulated in UI)');
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* --- Settings Header Banner --- */}
      <section className={styles.headerBanner}>
        <div className={styles.headerContent}>
          <div className={styles.headerBadge}>
            <User size={14} />
            <span>Preferences & System</span>
          </div>
          <h1 className={styles.headerTitle}>Account Settings</h1>
          <p className={styles.headerSubtitle}>
            Customize your CareerLens AI experience, theme preferences, notifications,
            and AI diagnostic feedback parameters.
          </p>
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

      {/* --- Navigation Tabs Bar --- */}
      <nav className={styles.tabNavigation} aria-label="Settings Tabs">
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'account' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('account')}
        >
          <User size={16} />
          Account & Security
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'appearance' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('appearance')}
        >
          <Palette size={16} />
          Appearance & Theme
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'notifications' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell size={16} />
          Notifications
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'privacy' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('privacy')}
        >
          <Shield size={16} />
          Privacy & Data
        </button>
        <button
          type="button"
          className={`${styles.tabBtn} ${activeTab === 'ai' ? styles.tabBtnActive : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          <Sparkles size={16} />
          AI Preferences
        </button>
      </nav>

      {/* --- Toast Feedback Banner --- */}
      {toastMessage && (
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
          {toastMessage}
        </div>
      )}

      {/* --- Main Content Layout --- */}
      <div className={styles.contentLayout}>
        {/* Left Column: Tab Panels */}
        <div className={styles.mainColumn}>
          {/* --- TAB 1: ACCOUNT & SECURITY --- */}
          {activeTab === 'account' && (
            <>
              {/* Profile Details */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      <User size={18} color="var(--color-primary)" />
                      Profile Details
                    </h2>
                    <span className={styles.sectionSubtitle}>
                      Manage your primary account identity and login credentials
                    </span>
                  </div>
                </div>

                <form onSubmit={handleSaveAccount}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroup}>
                      <label className={styles.inputLabel}>Display Name</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
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
                      <label className={styles.inputLabel}>Primary Occupation / Title</label>
                      <input
                        type="text"
                        className={styles.formInput}
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.btnRow}>
                    <button type="submit" className={styles.primaryBtn}>
                      Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>

              {/* Password & Authentication */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      <KeyRound size={18} color="var(--color-primary)" />
                      Password & Authentication
                    </h2>
                    <span className={styles.sectionSubtitle}>
                      Ensure your account uses a secure, non-reused password
                    </span>
                  </div>
                </div>

                <form onSubmit={handleUpdatePassword}>
                  <div className={styles.formGrid}>
                    <div className={styles.formGroupFull}>
                      <label className={styles.inputLabel}>Current Password</label>
                      <input
                        type="password"
                        className={styles.formInput}
                        placeholder="Enter current password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.inputLabel}>New Password</label>
                      <input
                        type="password"
                        className={styles.formInput}
                        placeholder="Minimum 8 characters"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className={styles.formGroup}>
                      <label className={styles.inputLabel}>Confirm New Password</label>
                      <input
                        type="password"
                        className={styles.formInput}
                        placeholder="Repeat new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className={styles.btnRow}>
                    <button type="submit" className={styles.primaryBtn}>
                      Update Password
                    </button>
                  </div>
                </form>
              </div>

              {/* Danger Zone */}
              <div className={`${styles.sectionCard} ${styles.dangerCard}`}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={`${styles.sectionTitle} ${styles.dangerTitle}`}>
                      <AlertTriangle size={18} color="#ef4444" />
                      Danger Zone
                    </h2>
                    <span className={styles.sectionSubtitle}>
                      Permanently delete your CareerLens AI candidate profile and all associated data
                    </span>
                  </div>
                </div>

                <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                  Once deleted, all your uploaded resumes, simulated interview transcripts, scorecards,
                  and application history will be permanently wiped.
                </p>

                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <button
                    type="button"
                    className={styles.dangerBtn}
                    onClick={handleDeleteAccount}
                  >
                    Delete Account & Data
                  </button>
                </div>
              </div>
            </>
          )}

          {/* --- TAB 2: APPEARANCE & THEME --- */}
          {activeTab === 'appearance' && (
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>
                    <Palette size={18} color="var(--color-primary)" />
                    Appearance & Theme
                  </h2>
                  <span className={styles.sectionSubtitle}>
                    Select your preferred interface color mode and display density
                  </span>
                </div>
              </div>

              <div className={styles.themeGrid}>
                {/* Light Theme Card */}
                <div
                  className={`${styles.themeCard} ${theme === 'light' ? styles.themeCardActive : ''}`}
                  onClick={() => setTheme('light')}
                  role="button"
                  tabIndex={0}
                  aria-pressed={theme === 'light'}
                >
                  <div className={styles.themeCardHeader}>
                    <span className={styles.themeCardTitle}>
                      <Sun size={18} color="#f59e0b" />
                      Light Mode
                    </span>
                    {theme === 'light' && <Check size={18} color="var(--color-primary)" />}
                  </div>

                  <div className={`${styles.themePreview} ${styles.previewLight}`}>
                    <div className={`${styles.previewBar} ${styles.previewBarPrimary}`} style={{ width: '40%' }} />
                    <div className={styles.previewBar} style={{ width: '75%' }} />
                    <div className={styles.previewBar} style={{ width: '55%' }} />
                  </div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Clean white background with vibrant blue primary accents
                  </span>
                </div>

                {/* Dark Theme Card */}
                <div
                  className={`${styles.themeCard} ${theme === 'dark' ? styles.themeCardActive : ''}`}
                  onClick={() => setTheme('dark')}
                  role="button"
                  tabIndex={0}
                  aria-pressed={theme === 'dark'}
                >
                  <div className={styles.themeCardHeader}>
                    <span className={styles.themeCardTitle}>
                      <Moon size={18} color="var(--color-accent)" />
                      Dark Mode
                    </span>
                    {theme === 'dark' && <Check size={18} color="var(--color-accent)" />}
                  </div>

                  <div className={`${styles.themePreview} ${styles.previewDark}`}>
                    <div className={`${styles.previewBar} ${styles.previewBarPrimary}`} style={{ width: '40%' }} />
                    <div className={styles.previewBar} style={{ width: '75%' }} />
                    <div className={styles.previewBar} style={{ width: '55%' }} />
                  </div>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Deep dark surfaces (#0f1015) with energetic orange accents
                  </span>
                </div>
              </div>

              <div className={styles.toggleList} style={{ marginTop: 'var(--space-4)' }}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleTitle}>Compact Interface Density</span>
                    <span className={styles.toggleDesc}>
                      Reduce padding and table row heights to view more data on screen
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={density === 'compact'}
                      onChange={(e) => {
                        setDensity(e.target.checked ? 'compact' : 'comfortable');
                        showToast(`Interface density set to ${e.target.checked ? 'Compact' : 'Comfortable'}`);
                      }}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* --- TAB 3: NOTIFICATIONS --- */}
          {activeTab === 'notifications' && (
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>
                    <Bell size={18} color="var(--color-primary)" />
                    Notification Preferences
                  </h2>
                  <span className={styles.sectionSubtitle}>
                    Choose which notifications and email digests you would like to receive
                  </span>
                </div>
              </div>

              <div className={styles.toggleList}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleTitle}>Application Pipeline Updates</span>
                    <span className={styles.toggleDesc}>
                      Receive email alerts when scheduled interview dates or application stages update
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifyAppStatus}
                      onChange={(e) => setNotifyAppStatus(e.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleTitle}>Interview Report Summaries</span>
                    <span className={styles.toggleDesc}>
                      Send completed mock interview scorecards directly to your primary email
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifyInterviewSummary}
                      onChange={(e) => setNotifyInterviewSummary(e.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleTitle}>Weekly Career Digest</span>
                    <span className={styles.toggleDesc}>
                      A weekly recap of application activity, newly discovered skill gaps, and industry benchmarks
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifyWeeklyDigest}
                      onChange={(e) => setNotifyWeeklyDigest(e.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleTitle}>Product Improvements & Career Tips</span>
                    <span className={styles.toggleDesc}>
                      Stay informed about new AI models, interview rubrics, and platform capabilities
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={notifyProductTips}
                      onChange={(e) => setNotifyProductTips(e.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>

                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleTitle}>Browser Push Notifications</span>
                    <span className={styles.toggleDesc}>
                      Real-time desktop alerts for active interview countdowns and task deadlines
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={pushNotifications}
                      onChange={(e) => setPushNotifications(e.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => showToast('Notification preferences saved.')}
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}

          {/* --- TAB 4: PRIVACY & DATA --- */}
          {activeTab === 'privacy' && (
            <>
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      <Shield size={18} color="var(--color-primary)" />
                      Privacy & Data Sharing
                    </h2>
                    <span className={styles.sectionSubtitle}>
                      Control how your resume and interview simulation telemetry is handled
                    </span>
                  </div>
                </div>

                <div className={styles.toggleList}>
                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <span className={styles.toggleTitle}>Model Diagnostic Diagnostics</span>
                      <span className={styles.toggleDesc}>
                        Share anonymized interview transcripts to improve assessment fairness and rubric quality
                      </span>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={allowAnonymizedData}
                        onChange={(e) => setAllowAnonymizedData(e.target.checked)}
                      />
                      <span className={styles.slider} />
                    </label>
                  </div>

                  <div className={styles.toggleRow}>
                    <div className={styles.toggleInfo}>
                      <span className={styles.toggleTitle}>Partner Recruiter Matching</span>
                      <span className={styles.toggleDesc}>
                        Allow verified hiring partners to view anonymized profile summaries matching their open roles
                      </span>
                    </div>
                    <label className={styles.switch}>
                      <input
                        type="checkbox"
                        checked={recruiterVisibility}
                        onChange={(e) => setRecruiterVisibility(e.target.checked)}
                      />
                      <span className={styles.slider} />
                    </label>
                  </div>
                </div>

                <div className={styles.btnRow}>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    onClick={() => showToast('Privacy parameters updated.')}
                  >
                    Update Privacy Settings
                  </button>
                </div>
              </div>

              {/* Active Sessions Card */}
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  <div>
                    <h2 className={styles.sectionTitle}>
                      <Laptop size={18} color="var(--color-primary)" />
                      Active Devices & Sessions
                    </h2>
                    <span className={styles.sectionSubtitle}>
                      Manage active browser logins and security tokens
                    </span>
                  </div>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-3) var(--space-4)',
                    background: 'var(--color-bg)',
                    border: '1px solid var(--color-border-subtle)',
                    borderRadius: 'var(--radius-md)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                    <Laptop size={20} color="var(--color-accent)" />
                    <div>
                      <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                        Chrome on Windows (Current Device)
                      </div>
                      <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                        Active now · IP: Localhost / Staging
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      padding: '2px 8px',
                      background: 'rgba(16, 185, 129, 0.1)',
                      color: '#10b981',
                      fontSize: '11px',
                      fontWeight: 600,
                      borderRadius: 'var(--radius-full)',
                    }}
                  >
                    Active Session
                  </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 'var(--space-2)' }}>
                  <button
                    type="button"
                    className={styles.primaryBtn}
                    style={{ background: 'var(--color-surface)', color: 'var(--color-text-primary)', border: '1px solid var(--color-border)' }}
                    onClick={() => showToast('Export initiated: your data package is being prepared.')}
                  >
                    <Download size={14} style={{ marginRight: '6px' }} />
                    Download All My Data
                  </button>
                </div>
              </div>
            </>
          )}

          {/* --- TAB 5: AI PREFERENCES --- */}
          {activeTab === 'ai' && (
            <div className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <h2 className={styles.sectionTitle}>
                    <Sparkles size={18} color="var(--color-primary)" />
                    AI Interview & Evaluation Preferences
                  </h2>
                  <span className={styles.sectionSubtitle}>
                    Tune the reasoning depth, feedback style, and scoring persona of AI agents
                  </span>
                </div>
              </div>

              <div>
                <label className={styles.inputLabel} style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                  Interview Feedback Detail Level
                </label>
                <div className={styles.radioList}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="feedbackDepth"
                      checked={feedbackDepth === 'concise'}
                      onChange={() => setFeedbackDepth('concise')}
                    />
                    <div>
                      <div className={styles.radioOptionTitle}>Concise Key Points</div>
                      <div className={styles.radioOptionDesc}>
                        Quick bulleted takeaways highlighting the strongest answer element and primary flaw.
                      </div>
                    </div>
                  </label>

                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="feedbackDepth"
                      checked={feedbackDepth === 'balanced'}
                      onChange={() => setFeedbackDepth('balanced')}
                    />
                    <div>
                      <div className={styles.radioOptionTitle}>Balanced Analysis (Recommended)</div>
                      <div className={styles.radioOptionDesc}>
                        Comprehensive review covering technical accuracy, STAR framework alignment, and delivery.
                      </div>
                    </div>
                  </label>

                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="feedbackDepth"
                      checked={feedbackDepth === 'comprehensive'}
                      onChange={() => setFeedbackDepth('comprehensive')}
                    />
                    <div>
                      <div className={styles.radioOptionTitle}>Comprehensive Deep-Dive</div>
                      <div className={styles.radioOptionDesc}>
                        Sentence-by-sentence evaluation with recommended alternative phrasing and code optimization snippets.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-4)' }}>
                <label className={styles.inputLabel} style={{ marginBottom: 'var(--space-2)', display: 'block' }}>
                  AI Coach Persona & Feedback Tone
                </label>
                <div className={styles.radioList}>
                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="coachTone"
                      checked={coachTone === 'rigorous'}
                      onChange={() => setCoachTone('rigorous')}
                    />
                    <div>
                      <div className={styles.radioOptionTitle}>Rigorous & Critical</div>
                      <div className={styles.radioOptionDesc}>
                        Strict, high-bar scrutiny focused on uncovering subtle edge-case gaps.
                      </div>
                    </div>
                  </label>

                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="coachTone"
                      checked={coachTone === 'encouraging'}
                      onChange={() => setCoachTone('encouraging')}
                    />
                    <div>
                      <div className={styles.radioOptionTitle}>Encouraging & Constructive</div>
                      <div className={styles.radioOptionDesc}>
                        Empathetic coaching with supportive phrasing and confidence-building advice.
                      </div>
                    </div>
                  </label>

                  <label className={styles.radioOption}>
                    <input
                      type="radio"
                      name="coachTone"
                      checked={coachTone === 'technical'}
                      onChange={() => setCoachTone('technical')}
                    />
                    <div>
                      <div className={styles.radioOptionTitle}>Technical & Metric-Focused</div>
                      <div className={styles.radioOptionDesc}>
                        Data-first approach analyzing algorithmic complexity and quantified accomplishments.
                      </div>
                    </div>
                  </label>
                </div>
              </div>

              <div className={styles.toggleList} style={{ marginTop: 'var(--space-2)' }}>
                <div className={styles.toggleRow}>
                  <div className={styles.toggleInfo}>
                    <span className={styles.toggleTitle}>Automatic Job Description Parsing</span>
                    <span className={styles.toggleDesc}>
                      Automatically extract key technical competencies whenever a job link is pasted
                    </span>
                  </div>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      checked={autoAnalyzeJD}
                      onChange={(e) => setAutoAnalyzeJD(e.target.checked)}
                    />
                    <span className={styles.slider} />
                  </label>
                </div>
              </div>

              <div className={styles.btnRow}>
                <button
                  type="button"
                  className={styles.primaryBtn}
                  onClick={() => showToast('AI preferences saved.')}
                >
                  Save AI Preferences
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Account Plan & Support Cards */}
        <aside className={styles.sideColumn}>
          {/* Plan Card */}
          <div className={styles.sideCard}>
            <div className={styles.planCardHeader}>
              <span className={styles.planName}>Community Tier</span>
              <span className={styles.planBadge}>Active</span>
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              You are currently on the Free Community Plan with baseline career development capabilities.
            </p>

            <div className={styles.planFeatures}>
              <div className={styles.planFeatureItem}>
                <Check size={14} color="#10b981" />
                <span>Unlimited Resume Workspace Scans</span>
              </div>
              <div className={styles.planFeatureItem}>
                <Check size={14} color="#10b981" />
                <span>3 Mock Interview Sessions / week</span>
              </div>
              <div className={styles.planFeatureItem}>
                <Check size={14} color="#10b981" />
                <span>Full Application Tracking Pipeline</span>
              </div>
            </div>

            <button
              type="button"
              className={styles.upgradeBtn}
              onClick={() => showToast('CareerLens Pro upgrade flow is simulated in this build.')}
            >
              <Crown size={16} />
              Upgrade to Pro
            </button>
          </div>

          {/* Help & Support Card */}
          <div className={styles.sideCard}>
            <div className={styles.planCardHeader}>
              <span className={styles.planName}>Help & Resources</span>
              <HelpCircle size={18} color="var(--color-text-muted)" />
            </div>

            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              Need assistance preparing for interviews or organizing your applications?
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('FAQ and Guide modal to be linked.');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                <span>User Guide & FAQs</span>
                <ExternalLink size={12} />
              </a>

              <a
                href="#support"
                onClick={(e) => {
                  e.preventDefault();
                  showToast('Support email: support@careerlens.ai');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-primary)',
                  textDecoration: 'none',
                  fontWeight: 600,
                }}
              >
                <span>Contact Product Support</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default SettingsPage;
