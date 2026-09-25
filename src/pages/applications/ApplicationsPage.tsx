/**
 * CareerLens AI — Applications Tracker Page
 *
 * Route: /applications
 * Visual Reference: Website Look/Application.png
 *
 * Provides manual job application tracking, status management,
 * and opportunity organization. Frontend UI state only.
 */

import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Search,
  Calendar,
  Building,
  Clock,
  Award,
  Trash2,
  TrendingUp,
  Sparkles,
  Lightbulb,
  X,
} from 'lucide-react';
import { MascotCanvas } from '@/mascot';
import styles from './ApplicationsPage.module.css';

export type ApplicationStatus = 'applied' | 'in-progress' | 'interview' | 'offer' | 'rejected';

export interface JobApplication {
  id: string;
  company: string;
  role: string;
  location: string;
  dateApplied: string;
  status: ApplicationStatus;
  jobUrl?: string;
  notes?: string;
}

export const ApplicationsPage: React.FC = () => {
  // Local application state — defaults to empty for product truthfulness
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Modal form state
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newLocation, setNewLocation] = useState('Remote');
  const [newDate, setNewDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('applied');
  const [newNotes, setNewNotes] = useState('');
  const [formError, setFormError] = useState('');

  // Counts
  const totalCount = applications.length;
  const inProgressCount = applications.filter((a) => a.status === 'in-progress').length;
  const interviewCount = applications.filter((a) => a.status === 'interview').length;
  const offerCount = applications.filter((a) => a.status === 'offer').length;
  const rejectedCount = applications.filter((a) => a.status === 'rejected').length;
  const appliedCount = applications.filter((a) => a.status === 'applied').length;

  // Filtered applications
  const filteredApps = applications.filter((app) => {
    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'in-progress' && app.status === 'in-progress') ||
      (selectedFilter === 'interview' && app.status === 'interview') ||
      (selectedFilter === 'offer' && app.status === 'offer') ||
      (selectedFilter === 'rejected' && app.status === 'rejected') ||
      (selectedFilter === 'applied' && app.status === 'applied');

    const matchesSearch =
      searchQuery.trim() === '' ||
      app.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.location.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const handleOpenModal = () => {
    setNewCompany('');
    setNewRole('');
    setNewLocation('Remote');
    setNewDate(new Date().toISOString().split('T')[0]);
    setNewStatus('applied');
    setNewNotes('');
    setFormError('');
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveApplication = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) {
      setFormError('Company name and role title are required.');
      return;
    }

    const newApp: JobApplication = {
      id: `app_${Date.now()}`,
      company: newCompany.trim(),
      role: newRole.trim(),
      location: newLocation.trim() || 'Remote',
      dateApplied: newDate,
      status: newStatus,
      notes: newNotes.trim() || undefined,
    };

    setApplications((prev) => [newApp, ...prev]);
    setIsModalOpen(false);
  };

  const handleDeleteApplication = (id: string) => {
    setApplications((prev) => prev.filter((a) => a.id !== id));
  };

  const handleStatusChange = (id: string, nextStatus: ApplicationStatus) => {
    setApplications((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: nextStatus } : app))
    );
  };

  const getStatusBadgeClass = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return styles.statusApplied;
      case 'in-progress':
        return styles.statusInProgress;
      case 'interview':
        return styles.statusInterview;
      case 'offer':
        return styles.statusOffer;
      case 'rejected':
        return styles.statusRejected;
      default:
        return styles.statusApplied;
    }
  };

  const getStatusLabel = (status: ApplicationStatus) => {
    switch (status) {
      case 'applied':
        return 'Applied';
      case 'in-progress':
        return 'In Progress';
      case 'interview':
        return 'Interviewing';
      case 'offer':
        return 'Offer Received';
      case 'rejected':
        return 'Archived / Rejected';
      default:
        return status;
    }
  };

  return (
    <div className={styles.pageContainer}>
      {/* --- Hero Banner --- */}
      <section className={styles.heroBanner}>
        <div className={styles.heroContent}>
          <div className={styles.heroBadge}>
            <Briefcase size={14} />
            <span>Opportunity Pipeline</span>
          </div>
          <h1 className={styles.heroTitle}>Track Your Opportunities</h1>
          <p className={styles.heroDescription}>
            Manage every application, interview round, and job offer in one centralized tracker.
            Log new submissions manually to stay structured across your hiring pipeline.
          </p>
          <div className={styles.heroActions}>
            <button
              type="button"
              className={styles.primaryAddButton}
              onClick={handleOpenModal}
            >
              <Plus size={16} />
              <span>Add Application</span>
            </button>
          </div>
        </div>

        {/* Mascot Container */}
        <div className={styles.heroMascotArea} aria-hidden="true">
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

      {/* --- Metric Cards --- */}
      <section className={styles.metricsGrid} aria-label="Application Metrics">
        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Total Applications</span>
            <div className={styles.metricIconWrap} style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6' }}>
              <Briefcase size={18} />
            </div>
          </div>
          <div className={styles.metricValue}>{totalCount}</div>
          <div className={styles.metricFootnote}>Tracked submissions</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>In Progress</span>
            <div className={styles.metricIconWrap} style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className={styles.metricValue}>{inProgressCount}</div>
          <div className={styles.metricFootnote}>Active review stages</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Interviews</span>
            <div className={styles.metricIconWrap} style={{ background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6' }}>
              <Sparkles size={18} />
            </div>
          </div>
          <div className={styles.metricValue}>{interviewCount}</div>
          <div className={styles.metricFootnote}>Scheduled or ongoing</div>
        </div>

        <div className={styles.metricCard}>
          <div className={styles.metricHeader}>
            <span className={styles.metricLabel}>Offers</span>
            <div className={styles.metricIconWrap} style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Award size={18} />
            </div>
          </div>
          <div className={styles.metricValue}>{offerCount}</div>
          <div className={styles.metricFootnote}>Decision pending</div>
        </div>
      </section>

      {/* --- Main Content Layout --- */}
      <div className={styles.contentLayout}>
        {/* Left Column: Applications Tracker List & Controls */}
        <div className={styles.mainColumn}>
          {/* Filter and Search Bar */}
          <div className={styles.filterBar}>
            <div className={styles.searchWrap}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder="Search company, role, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search applications"
              />
            </div>

            <div className={styles.statusTabs} role="tablist">
              <button
                type="button"
                className={`${styles.statusTab} ${selectedFilter === 'all' ? styles.statusTabActive : ''}`}
                onClick={() => setSelectedFilter('all')}
              >
                All <span className={styles.tabCount}>{totalCount}</span>
              </button>
              <button
                type="button"
                className={`${styles.statusTab} ${selectedFilter === 'in-progress' ? styles.statusTabActive : ''}`}
                onClick={() => setSelectedFilter('in-progress')}
              >
                In Progress <span className={styles.tabCount}>{inProgressCount}</span>
              </button>
              <button
                type="button"
                className={`${styles.statusTab} ${selectedFilter === 'interview' ? styles.statusTabActive : ''}`}
                onClick={() => setSelectedFilter('interview')}
              >
                Interviews <span className={styles.tabCount}>{interviewCount}</span>
              </button>
              <button
                type="button"
                className={`${styles.statusTab} ${selectedFilter === 'offer' ? styles.statusTabActive : ''}`}
                onClick={() => setSelectedFilter('offer')}
              >
                Offers <span className={styles.tabCount}>{offerCount}</span>
              </button>
              <button
                type="button"
                className={`${styles.statusTab} ${selectedFilter === 'rejected' ? styles.statusTabActive : ''}`}
                onClick={() => setSelectedFilter('rejected')}
              >
                Rejected <span className={styles.tabCount}>{rejectedCount}</span>
              </button>
            </div>
          </div>

          {/* List or Empty State */}
          {filteredApps.length === 0 ? (
            <div className={styles.emptyCard}>
              <div className={styles.emptyIconWrap}>
                <Briefcase size={28} />
              </div>
              <h3 className={styles.emptyTitle}>
                {searchQuery || selectedFilter !== 'all'
                  ? 'No applications match your filter'
                  : 'No applications tracked yet'}
              </h3>
              <p className={styles.emptyDescription}>
                {searchQuery || selectedFilter !== 'all'
                  ? 'Try adjusting your search criteria or filter to see more applications.'
                  : 'Start organizing your career pipeline. Log job applications manually to keep your timelines, interview stages, and notes structured.'}
              </p>

              {(!searchQuery && selectedFilter === 'all') && (
                <>
                  <button
                    type="button"
                    className={styles.primaryAddButton}
                    onClick={handleOpenModal}
                    style={{ marginTop: 'var(--space-2)' }}
                  >
                    <Plus size={16} />
                    <span>Add Your First Application</span>
                  </button>

                  <div className={styles.emptyFeatures}>
                    <div className={styles.emptyFeatureItem}>
                      <span className={styles.emptyFeatureTitle}>
                        <TrendingUp size={14} color="var(--color-primary)" />
                        Pipeline Visibility
                      </span>
                      <span className={styles.emptyFeatureDesc}>
                        Track status transitions from initial submission to final job offer.
                      </span>
                    </div>

                    <div className={styles.emptyFeatureItem}>
                      <span className={styles.emptyFeatureTitle}>
                        <Calendar size={14} color="var(--color-primary)" />
                        Timeline Records
                      </span>
                      <span className={styles.emptyFeatureDesc}>
                        Keep exact submission dates and follow-up deadlines recorded.
                      </span>
                    </div>

                    <div className={styles.emptyFeatureItem}>
                      <span className={styles.emptyFeatureTitle}>
                        <Sparkles size={14} color="var(--color-primary)" />
                        Interview Ready
                      </span>
                      <span className={styles.emptyFeatureDesc}>
                        Prepare for upcoming rounds with targeted AI mock interview sessions.
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className={styles.tableContainer}>
              <table className={styles.appTable}>
                <thead>
                  <tr>
                    <th>Company</th>
                    <th>Role</th>
                    <th>Date Applied</th>
                    <th>Status</th>
                    <th>Notes</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredApps.map((app) => (
                    <tr key={app.id} className={styles.appTableRow}>
                      <td>
                        <div className={styles.companyCell}>
                          <div className={styles.companyBadge}>
                            {app.company.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className={styles.companyName}>{app.company}</div>
                            <div className={styles.companyLocation}>{app.location}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
                          {app.role}
                        </span>
                      </td>
                      <td>{app.dateApplied}</td>
                      <td>
                        <span className={`${styles.statusBadge} ${getStatusBadgeClass(app.status)}`}>
                          {getStatusLabel(app.status)}
                        </span>
                      </td>
                      <td>
                        <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                          {app.notes || '—'}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicationStatus)}
                            className={styles.actionBtn}
                            style={{ fontSize: '11px', padding: '4px 8px' }}
                            aria-label={`Update status for ${app.company}`}
                          >
                            <option value="applied">Applied</option>
                            <option value="in-progress">In Progress</option>
                            <option value="interview">Interview</option>
                            <option value="offer">Offer</option>
                            <option value="rejected">Rejected</option>
                          </select>
                          <button
                            type="button"
                            className={`${styles.actionBtn} ${styles.deleteBtn}`}
                            onClick={() => handleDeleteApplication(app.id)}
                            title="Delete application"
                            aria-label={`Delete application for ${app.company}`}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Funnel & Supporting Cards */}
        <aside className={styles.sideColumn}>
          {/* Application Funnel Card */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>
              <span>Application Funnel</span>
              <TrendingUp size={16} color="var(--color-primary)" />
            </div>
            <div className={styles.funnelList}>
              <div className={styles.funnelItem}>
                <span className={styles.funnelStage}>
                  <Building size={14} />
                  Applied
                </span>
                <span className={styles.funnelCount}>{appliedCount}</span>
              </div>
              <div className={styles.funnelItem}>
                <span className={styles.funnelStage}>
                  <Clock size={14} />
                  In Progress
                </span>
                <span className={styles.funnelCount}>{inProgressCount}</span>
              </div>
              <div className={styles.funnelItem}>
                <span className={styles.funnelStage}>
                  <Sparkles size={14} />
                  Interviewing
                </span>
                <span className={styles.funnelCount}>{interviewCount}</span>
              </div>
              <div className={styles.funnelItem}>
                <span className={styles.funnelStage}>
                  <Award size={14} />
                  Offers Received
                </span>
                <span className={styles.funnelCount}>{offerCount}</span>
              </div>
            </div>
          </div>

          {/* Upcoming Tasks Card */}
          <div className={styles.sideCard}>
            <div className={styles.sideCardTitle}>
              <span>Upcoming Tasks</span>
              <Calendar size={16} color="var(--color-text-muted)" />
            </div>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
              No scheduled deadlines or reminders. As you track applications, scheduled interviews and follow-up deadlines will be organized here.
            </p>
          </div>

          {/* Motivational Tip Card */}
          <div className={styles.quoteCard}>
            <div className={styles.quoteHeader}>
              <Lightbulb size={16} color="var(--color-accent)" />
              <span>Career Insight</span>
            </div>
            <p>
              "High quality applications tailored directly to job descriptions with quantified achievements yield significantly higher interview rates than blanket submissions."
            </p>
          </div>
        </aside>
      </div>

      {/* --- Add Application Modal --- */}
      {isModalOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 id="modal-title" className={styles.modalTitle}>Add New Application</h2>
              <button
                type="button"
                className={styles.modalCloseBtn}
                onClick={handleCloseModal}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveApplication}>
              <div className={styles.modalBody}>
                {formError && (
                  <div style={{ color: '#ef4444', fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>
                    {formError}
                  </div>
                )}

                <div className={styles.formGroup}>
                  <label htmlFor="company-name" className={styles.formLabel}>
                    Company Name *
                  </label>
                  <input
                    id="company-name"
                    type="text"
                    className={styles.formInput}
                    placeholder="e.g. Acme Corp"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="role-title" className={styles.formLabel}>
                    Role Title *
                  </label>
                  <input
                    id="role-title"
                    type="text"
                    className={styles.formInput}
                    placeholder="e.g. Senior Frontend Engineer"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-3)' }}>
                  <div className={styles.formGroup}>
                    <label htmlFor="job-location" className={styles.formLabel}>
                      Location
                    </label>
                    <input
                      id="job-location"
                      type="text"
                      className={styles.formInput}
                      placeholder="e.g. Remote, NY"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="applied-date" className={styles.formLabel}>
                      Date Applied
                    </label>
                    <input
                      id="applied-date"
                      type="date"
                      className={styles.formInput}
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="application-status" className={styles.formLabel}>
                    Current Stage
                  </label>
                  <select
                    id="application-status"
                    className={styles.formSelect}
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                  >
                    <option value="applied">Applied (Initial)</option>
                    <option value="in-progress">In Progress (Review / Recruiter)</option>
                    <option value="interview">Interview Scheduled</option>
                    <option value="offer">Offer Received</option>
                    <option value="rejected">Rejected / Archived</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="notes" className={styles.formLabel}>
                    Notes / Next Step
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    className={styles.formTextarea}
                    placeholder="e.g. Recruiter reach-out on LinkedIn, follow-up scheduled for next Tuesday"
                    value={newNotes}
                    onChange={(e) => setNewNotes(e.target.value)}
                  />
                </div>
              </div>

              <div className={styles.modalFooter}>
                <button
                  type="button"
                  className={styles.cancelBtn}
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={styles.submitBtn}
                >
                  Save Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationsPage;
