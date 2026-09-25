/**
 * CareerLens AI — Authenticated Application Shell (AppLayout)
 *
 * Provides:
 * - Persistent desktop sidebar navigation (≥1024px)
 * - Collapsible mobile drawer navigation (<1024px)
 * - Sticky header with search, theme toggle, and neutral user profile badge
 * - Outlet for authenticated routes (/dashboard, /resume, etc.)
 *
 * Source of Truth: Website Look/Dashboard.png and 07_Frontend-Architecture.md
 */

import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import {
  LayoutDashboard,
  FileText,
  Briefcase,
  Target,
  Mic,
  FolderKanban,
  User,
  Settings,
  Sun,
  Moon,
  Search,
  Bell,
  Menu,
  X,
  Sparkles,
  ArrowRight,
  Bot,
} from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import { FloatingMascot, useMascot } from '@/mascot';
import styles from './AppLayout.module.css';

interface NavItemConfig {
  label: string;
  path: string;
  icon: React.ReactNode;
  isActive: (pathname: string) => boolean;
}

const PRIMARY_NAV_ITEMS: NavItemConfig[] = [
  {
    label: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: <LayoutDashboard size={18} />,
    isActive: (p) => p === ROUTES.DASHBOARD,
  },
  {
    label: 'Resume',
    path: ROUTES.RESUME,
    icon: <FileText size={18} />,
    isActive: (p) => p.startsWith('/resume'),
  },
  {
    label: 'Job Match',
    path: ROUTES.JOB_MATCH,
    icon: <Briefcase size={18} />,
    isActive: (p) => p.startsWith('/job-match'),
  },
  {
    label: 'Skill Gap',
    path: ROUTES.SKILL_GAP,
    icon: <Target size={18} />,
    isActive: (p) => p.startsWith('/skill-gap'),
  },
  {
    label: 'Mock Interview',
    path: ROUTES.INTERVIEW_SETUP,
    icon: <Mic size={18} />,
    isActive: (p) => p.startsWith('/interview'),
  },
  {
    label: 'Applications',
    path: ROUTES.APPLICATIONS,
    icon: <FolderKanban size={18} />,
    isActive: (p) => p.startsWith('/applications'),
  },
];

const SECONDARY_NAV_ITEMS: NavItemConfig[] = [
  {
    label: 'Profile',
    path: ROUTES.PROFILE,
    icon: <User size={18} />,
    isActive: (p) => p.startsWith('/profile'),
  },
  {
    label: 'Settings',
    path: ROUTES.SETTINGS,
    icon: <Settings size={18} />,
    isActive: (p) => p.startsWith('/settings'),
  },
];

export const AppLayout: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { toggleFloatingMascot, floatingMascotVisible } = useMascot();
  const location = useLocation();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileDrawerOpen(false);
  }, [location.pathname]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={styles.appShell}>
      {/* Mobile Drawer Backdrop */}
      {mobileDrawerOpen && (
        <div
          className={styles.backdrop}
          onClick={() => setMobileDrawerOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        id="app-sidebar"
        className={`${styles.sidebar} ${mobileDrawerOpen ? styles.sidebarOpen : ''}`}
        aria-label="Application navigation"
      >
        {/* Brand Header */}
        <div className={styles.sidebarHeader}>
          <Link to={ROUTES.DASHBOARD} className={styles.brand}>
            <div className={styles.brandBadge} aria-hidden="true">CL</div>
            <div className={styles.brandInfo}>
              <span className={styles.brandName}>CareerLens AI</span>
              <span className={styles.brandTagline}>A smarter you. A brighter future.</span>
            </div>
          </Link>

          {/* Close button inside mobile drawer */}
          <button
            className={styles.closeMobileBtn}
            onClick={() => setMobileDrawerOpen(false)}
            aria-label="Close navigation sidebar"
          >
            <X size={18} />
          </button>
        </div>

        {/* Primary Navigation */}
        <nav className={styles.navGroup} aria-label="Main platform navigation">
          {PRIMARY_NAV_ITEMS.map((item) => {
            const active = item.isActive(location.pathname);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.divider} aria-hidden="true" />

        {/* Secondary Navigation */}
        <nav className={styles.navGroup} aria-label="User account navigation">
          <div className={styles.navSectionTitle}>Account</div>
          {SECONDARY_NAV_ITEMS.map((item) => {
            const active = item.isActive(location.pathname);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                <span className={styles.navIcon} aria-hidden="true">{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Upgrade Card (Matches Website Look/Dashboard.png) */}
        <div className={styles.upgradeCard}>
          <div className={styles.upgradeBadge}>
            <Sparkles size={14} aria-hidden="true" />
            <span>CareerLens Pro</span>
          </div>
          <p className={styles.upgradeDesc}>
            Unlock advanced insights, tailored mock interviews, and AI intelligence.
          </p>
          <button
            type="button"
            className={styles.upgradeBtn}
            onClick={(e) => e.preventDefault()}
            aria-label="Upgrade to CareerLens Pro (preview only)"
          >
            <span>Upgrade Now</span>
            <ArrowRight size={13} aria-hidden="true" />
          </button>
        </div>

        {/* Sidebar Footer Quote */}
        <div className={styles.sidebarFooter}>
          <p className={styles.sidebarQuote}>
            &ldquo;A better career is a more confident you.&rdquo;
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className={styles.mainContent}>
        {/* Dashboard Header */}
        <header className={styles.header} role="banner">
          <div className={styles.headerLeft}>
            {/* Mobile Hamburger Button */}
            <button
              className={styles.mobileMenuBtn}
              onClick={() => setMobileDrawerOpen((prev) => !prev)}
              aria-expanded={mobileDrawerOpen}
              aria-controls="app-sidebar"
              aria-label="Toggle navigation menu"
            >
              <Menu size={18} />
            </button>

            {/* Global Search Bar */}
            <div className={styles.searchBox}>
              <span className={styles.searchIcon} aria-hidden="true">
                <Search size={16} />
              </span>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search anything... (jobs, skills, companies...)"
                aria-label="Global search across jobs, skills, and companies"
              />
            </div>
          </div>

          {/* Header Actions */}
          <div className={styles.headerRight}>
            <Link to={ROUTES.LANDING} className={styles.publicSiteLink}>
              Public Site ←
            </Link>

            {/* 3D Career Companion Toggle */}
            <button
              type="button"
              onClick={toggleFloatingMascot}
              className={styles.iconBtn}
              aria-label="Toggle 3D Career Companion"
              title="Career Companion (3D Mascot)"
              style={{
                color: floatingMascotVisible ? 'var(--color-primary)' : undefined,
              }}
            >
              <Bot size={18} />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={styles.iconBtn}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>

            {/* Notification Bell (UI-only presentation) */}
            <button
              type="button"
              className={styles.iconBtn}
              aria-label="Notifications — no unread notifications"
              onClick={(e) => e.preventDefault()}
            >
              <Bell size={18} />
            </button>

            {/* User Profile Badge (Neutral presentation, no fabricated identity) */}
            <div className={styles.userProfileBadge}>
              <div className={styles.userAvatar} aria-hidden="true">CL</div>
              <span className={styles.userGreeting}>Welcome back</span>
            </div>
          </div>
        </header>

        {/* Main Outlet */}
        <main className={styles.pageContent} id="main-content">
          <Outlet />
        </main>

        {/* Floating Career Companion */}
        <FloatingMascot />
      </div>
    </div>
  );
};

export default AppLayout;
