/**
 * Approved Screen Map Route Constants
 * Source of Truth: 07_Frontend-Architecture.md (Section 3 and 5)
 */

export const ROUTES = {
  // Public
  LANDING: '/',

  // Auth
  LOGIN: '/login',
  REGISTER: '/register',

  // Core Application Shell
  DASHBOARD: '/dashboard',
  RESUME: '/resume',
  RESUME_ANALYSIS: '/resume/analysis',
  JOB_MATCH: '/job-match',
  SKILL_GAP: '/skill-gap',
  INTERVIEW_SETUP: '/interview/setup',
  INTERVIEW_LIVE: '/interview/live',
  INTERVIEW_REPORT: '/interview/report',
  APPLICATIONS: '/applications',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
