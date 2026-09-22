import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routes';

// Layouts
import { PublicLayout } from '@/app/app-shell/PublicLayout';
import { AppLayout } from '@/app/app-shell/AppLayout';

// Scaffolding Pages
import LandingPage from '@/pages/landing/LandingPage';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';
import ResumeWorkspacePage from '@/pages/resume/ResumeWorkspacePage';
import ResumeAnalysisPage from '@/pages/resume/ResumeAnalysisPage';
import JobMatchPage from '@/pages/job-match/JobMatchPage';
import SkillGapPage from '@/pages/skill-gap/SkillGapPage';
import InterviewSetupPage from '@/pages/interview/InterviewSetupPage';
import LiveInterviewPage from '@/pages/interview/LiveInterviewPage';
import InterviewReportPage from '@/pages/interview/InterviewReportPage';
import ApplicationsPage from '@/pages/applications/ApplicationsPage';
import ProfilePage from '@/pages/profile/ProfilePage';
import SettingsPage from '@/pages/settings/SettingsPage';
import NotFoundPage from '@/pages/error/NotFoundPage';

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public & Auth Route Hierarchy */}
        <Route element={<PublicLayout />}>
          <Route path={ROUTES.LANDING} element={<LandingPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
        </Route>

        {/* Authenticated Application Shell Hierarchy */}
        <Route element={<AppLayout />}>
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.RESUME} element={<ResumeWorkspacePage />} />
          <Route path={ROUTES.RESUME_ANALYSIS} element={<ResumeAnalysisPage />} />
          <Route path={ROUTES.JOB_MATCH} element={<JobMatchPage />} />
          <Route path={ROUTES.SKILL_GAP} element={<SkillGapPage />} />
          <Route path={ROUTES.INTERVIEW_SETUP} element={<InterviewSetupPage />} />
          <Route path={ROUTES.INTERVIEW_LIVE} element={<LiveInterviewPage />} />
          <Route path={ROUTES.INTERVIEW_REPORT} element={<InterviewReportPage />} />
          <Route path={ROUTES.APPLICATIONS} element={<ApplicationsPage />} />
          <Route path={ROUTES.PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>

        {/* Fallback / 404 Route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
