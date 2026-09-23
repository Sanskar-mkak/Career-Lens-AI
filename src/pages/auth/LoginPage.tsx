<<<<<<< HEAD
import React from 'react';

export const LoginPage: React.FC = () => {
  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '500px', margin: '0 auto' }}>
      <h1 style={{ fontSize: 'var(--font-size-2xl)', marginBottom: '0.5rem' }}>Login</h1>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '1.5rem' }}>
        Phase 1 Scaffolding — Authentication workflow to be implemented in Phase 2.
      </p>
      <div
        style={{
          padding: '1.5rem',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-primary)', fontWeight: 600 }}>
          Screen 02 — Authentication Entry
        </span>
=======
/**
 * CareerLens AI — Login Page
 *
 * Phase 3: Frontend Authentication UI
 * UI-only. No real authentication, backend calls, JWT, sessions, or OAuth behavior.
 * Validation is client-side presentation only.
 *
 * Visual reference: Website Look/Login_Signup Page.png
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import {
  Sun,
  Moon,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  FileText,
  Mic,
  Target,
} from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import styles from './AuthPages.module.css';

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

interface LoginFormFields {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginFormErrors {
  email?: string;
  password?: string;
}

/* ------------------------------------------------------------------ */
/* Validation                                                           */
/* ------------------------------------------------------------------ */

function validateLoginForm(fields: LoginFormFields): LoginFormErrors {
  const errors: LoginFormErrors = {};

  if (!fields.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email.trim())) {
    errors.email = 'Enter a valid email address.';
  }

  if (!fields.password) {
    errors.password = 'Password is required.';
  }

  return errors;
}

/* ------------------------------------------------------------------ */
/* Social Button SVG Icons (inline — no extra dep)                     */
/* ------------------------------------------------------------------ */

const GoogleIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
  </svg>
);

const GitHubIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="currentColor"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const LinkedInIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path
      fill="#0077B5"
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
    />
  </svg>
);

/* ------------------------------------------------------------------ */
/* LoginPage Component                                                  */
/* ------------------------------------------------------------------ */

export const LoginPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const [fields, setFields] = useState<LoginFormFields>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  /* ---- Handlers ---- */

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFields((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear the error for this field as the user types
    if (errors[name as keyof LoginFormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateLoginForm(fields);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitted(false);
      return;
    }
    // UI-only: validation passed. Authentication not yet implemented.
    setErrors({});
    setSubmitted(true);
  };

  /* ---- Render ---- */

  return (
    <div className={styles.authPage}>
      {/* ── Minimal Auth Navbar ── */}
      <nav className={styles.authNav} aria-label="Authentication navigation">
        <Link to={ROUTES.LANDING} className={styles.brand} aria-label="CareerLens AI — go to home">
          <div className={styles.brandBadge} aria-hidden="true">CL</div>
          <span>CareerLens AI</span>
        </Link>
        <button
          onClick={toggleTheme}
          className={styles.themeBtn}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </nav>

      {/* ── Two-Panel Body ── */}
      <div className={styles.authBody}>
        {/* ── Left: Form Panel ── */}
        <section className={styles.formPanel} aria-label="Login form">
          <div className={styles.formCard}>
            {/* Tab Switcher */}
            <div className={styles.tabRow} role="tablist" aria-label="Authentication options">
              <Link
                to={ROUTES.LOGIN}
                className={`${styles.tabLink} ${styles.tabLinkActive}`}
                role="tab"
                aria-selected="true"
                aria-current="page"
              >
                Login
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className={styles.tabLink}
                role="tab"
                aria-selected="false"
              >
                Sign Up
              </Link>
            </div>

            {/* Heading */}
            <h1 className={styles.heading}>Welcome Back</h1>
            <p className={styles.subheading}>
              Continue your journey towards a better career.
            </p>

            {/* Success notice (UI-only — authentication not yet implemented) */}
            {submitted && (
              <div
                role="status"
                aria-live="polite"
                style={{
                  padding: '0.75rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-success-bg)',
                  border: '1px solid var(--color-success)',
                  color: 'var(--color-success)',
                  fontSize: 'var(--font-size-sm)',
                  marginBottom: '1.25rem',
                  fontWeight: 500,
                }}
              >
                ✓ Validation passed. Authentication backend not yet connected.
              </div>
            )}

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Email */}
              <div className={styles.fieldGroup}>
                <label htmlFor="login-email" className={styles.label}>
                  Email address
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon} aria-hidden="true">
                    <Mail size={17} />
                  </span>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="Email address"
                    value={fields.email}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'login-email-error' : undefined}
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                  />
                </div>
                {errors.email && (
                  <span id="login-email-error" className={styles.errorMsg} role="alert">
                    {errors.email}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className={styles.fieldGroup}>
                <label htmlFor="login-password" className={styles.label}>
                  Password
                </label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputIcon} aria-hidden="true">
                    <Lock size={17} />
                  </span>
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Password"
                    value={fields.password}
                    onChange={handleChange}
                    aria-required="true"
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? 'login-password-error' : undefined}
                    className={`${styles.input} ${styles.passwordInput} ${errors.password ? styles.inputError : ''}`}
                  />
                  <button
                    type="button"
                    className={styles.visibilityBtn}
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    aria-pressed={showPassword}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.password && (
                  <span id="login-password-error" className={styles.errorMsg} role="alert">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Remember Me + Forgot Password */}
              <div className={styles.formMeta}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={fields.rememberMe}
                    onChange={handleChange}
                    className={styles.checkbox}
                  />
                  Remember me
                </label>
                {/* UI-only: forgot password link — backend not yet connected */}
                <a
                  href="#"
                  className={styles.forgotLink}
                  onClick={(e) => e.preventDefault()}
                  aria-label="Forgot password — password recovery not yet available"
                >
                  Forgot password?
                </a>
              </div>

              {/* Submit */}
              <button type="submit" className={styles.submitBtn}>
                Log in
                <ArrowRight size={17} aria-hidden="true" />
              </button>

              {/* Divider */}
              <div className={styles.divider} aria-hidden="true">
                <span className={styles.dividerLine} />
                or continue with
                <span className={styles.dividerLine} />
              </div>

              {/*
               * Social login buttons — UI PRESENTATION ONLY.
               * These buttons do NOT authenticate. OAuth not yet implemented.
               * Clicking prevents default to avoid any unintended navigation.
               */}
              <div className={styles.socialRow}>
                <button
                  type="button"
                  className={styles.socialBtn}
                  onClick={(e) => e.preventDefault()}
                  aria-label="Continue with Google — not yet available"
                >
                  <GoogleIcon />
                  Google
                </button>
                <button
                  type="button"
                  className={styles.socialBtn}
                  onClick={(e) => e.preventDefault()}
                  aria-label="Continue with GitHub — not yet available"
                >
                  <GitHubIcon />
                  GitHub
                </button>
                <button
                  type="button"
                  className={styles.socialBtn}
                  onClick={(e) => e.preventDefault()}
                  aria-label="Continue with LinkedIn — not yet available"
                >
                  <LinkedInIcon />
                  LinkedIn
                </button>
              </div>

              {/* Switch to Register */}
              <p className={styles.switchText}>
                Don't have an account?
                <Link to={ROUTES.REGISTER} className={styles.switchLink}>
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </section>

        {/* ── Right: Brand Panel ── */}
        <aside className={styles.brandPanel} aria-label="CareerLens AI platform overview">
          <p className={styles.brandLabel} aria-hidden="true">CareerLens AI</p>
          <h2 className={styles.brandHeadline}>
            Your Career{' '}
            <span className={styles.brandHeadlineAccent}>Copilot</span>
          </h2>
          <p className={styles.brandTagline}>
            Analyze. Improve. Practice. Apply.
            <br />
            Everything you need to land your dream job — powered by AI.
          </p>

          {/*
           * MASCOT PLACEHOLDER
           * Replace with: <img src="/assets/mascot.png" alt="CareerLens AI mascot" />
           * when the final standalone transparent mascot asset is available.
           */}
          <div className={styles.mascotContainer} aria-hidden="true">
            <div className={styles.mascotPlaceholder}>
              <span className={styles.mascotPlaceholderIcon}>
                <FileText size={48} strokeWidth={1.5} />
              </span>
              <span className={styles.mascotPlaceholderText}>Mascot</span>
            </div>
          </div>

          {/* Feature Pills */}
          <div className={styles.featurePills} aria-label="Platform capabilities">
            <div className={styles.featurePill}>
              <span className={styles.featurePillIcon}><FileText size={15} /></span>
              Better Resumes
            </div>
            <div className={styles.featurePill}>
              <span className={styles.featurePillIcon}><Mic size={15} /></span>
              More Interviews
            </div>
            <div className={styles.featurePill}>
              <span className={styles.featurePillIcon}><Target size={15} /></span>
              Bigger Opportunities
            </div>
          </div>

          {/* Testimonial */}
          <blockquote className={styles.testimonial}>
            <div className={styles.testimonialAvatar} aria-hidden="true">R</div>
            <div className={styles.testimonialBody}>
              <p className={styles.testimonialQuote}>
                "CareerLens AI helped me identify the exact skills I was missing.
                I went from confused to confident."
              </p>
              <p className={styles.testimonialAttribution}>
                — Rohan Mehta, SDE Intern @ Microsoft
              </p>
            </div>
          </blockquote>
        </aside>
>>>>>>> c8404c9 (feat : authentication window implementation)
      </div>
    </div>
  );
};

export default LoginPage;
