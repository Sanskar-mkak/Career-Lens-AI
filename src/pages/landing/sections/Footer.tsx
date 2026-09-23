import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/app/routes/routes';
import styles from '../LandingPage.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} aria-label="Site Footer">
      <div className={styles.contentWrapper}>
        <div className={styles.footerGrid}>
          {/* Brand Column */}
          <div className={styles.footerBrandCol}>
            <Link to={ROUTES.LANDING} className={styles.brand}>
              <div className={styles.brandBadge}>CL</div>
              <span>CareerLens AI</span>
            </Link>
            <p className={styles.footerTagline}>
              AI-powered resume intelligence and adaptive interview platform.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <div className={styles.footerColTitle}>Navigation</div>
            <ul className={styles.footerLinkList}>
              <li>
                <a href="#features" className={styles.footerLink}>
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className={styles.footerLink}>
                  How It Works
                </a>
              </li>
              <li>
                <a href="#why-careerlens" className={styles.footerLink}>
                  Why CareerLens
                </a>
              </li>
            </ul>
          </div>

          {/* Workspace Areas */}
          <div>
            <div className={styles.footerColTitle}>Platform</div>
            <ul className={styles.footerLinkList}>
              <li>
                <Link to={ROUTES.DASHBOARD} className={styles.footerLink}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to={ROUTES.RESUME} className={styles.footerLink}>
                  Resume Workspace
                </Link>
              </li>
              <li>
                <Link to={ROUTES.JOB_MATCH} className={styles.footerLink}>
                  Job Match
                </Link>
              </li>
              <li>
                <Link to={ROUTES.APPLICATIONS} className={styles.footerLink}>
                  Applications Tracker
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <div className={styles.footerColTitle}>Account</div>
            <ul className={styles.footerLinkList}>
              <li>
                <Link to={ROUTES.LOGIN} className={styles.footerLink}>
                  Log in
                </Link>
              </li>
              <li>
                <Link to={ROUTES.REGISTER} className={styles.footerLink}>
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.footerBottom}>
          <div>&copy; 2026 CareerLens AI. All rights reserved.</div>
          <div>Built for students, recent graduates, and software professionals.</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
