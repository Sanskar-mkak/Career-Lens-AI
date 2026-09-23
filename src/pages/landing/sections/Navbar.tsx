import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react';
import { ROUTES } from '@/app/routes/routes';
import styles from '../LandingPage.module.css';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header className={styles.navbar}>
      <div className={styles.navbarInner}>
        {/* Brand */}
        <Link to={ROUTES.LANDING} className={styles.brand}>
          <div className={styles.brandBadge}>CL</div>
          <span>CareerLens AI</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav aria-label="Main Navigation">
          <ul className={styles.navLinks}>
            <li>
              <a href="#features" className={styles.navLink}>
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className={styles.navLink}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#why-careerlens" className={styles.navLink}>
                Why CareerLens
              </a>
            </li>
          </ul>
        </nav>

        {/* Desktop Actions */}
        <div className={styles.navActions}>
          <button
            onClick={toggleTheme}
            className={styles.themeToggle}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <Link to={ROUTES.LOGIN} className={styles.loginBtn}>
            Log in
          </Link>
          <Link to={ROUTES.REGISTER} className={styles.getStartedBtn}>
            <span>Get Started</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className={styles.hamburgerBtn}
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className={`${styles.mobileDrawer} ${styles.mobileDrawerOpen}`} role="dialog" aria-modal="true">
          <ul className={styles.mobileNavLinks}>
            <li>
              <a href="#features" className={styles.navLink} onClick={closeMenu}>
                Features
              </a>
            </li>
            <li>
              <a href="#how-it-works" className={styles.navLink} onClick={closeMenu}>
                How It Works
              </a>
            </li>
            <li>
              <a href="#why-careerlens" className={styles.navLink} onClick={closeMenu}>
                Why CareerLens
              </a>
            </li>
          </ul>

          <div className={styles.mobileActions}>
            <button
              onClick={toggleTheme}
              className={styles.themeToggle}
              style={{ width: '100%' }}
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
              <span style={{ marginLeft: '0.5rem', fontSize: 'var(--font-size-sm)' }}>
                {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
              </span>
            </button>
            <Link to={ROUTES.LOGIN} className={styles.loginBtn} onClick={closeMenu} style={{ textAlign: 'center' }}>
              Log in
            </Link>
            <Link
              to={ROUTES.REGISTER}
              className={styles.getStartedBtn}
              onClick={closeMenu}
              style={{ justifyContent: 'center' }}
            >
              <span>Get Started</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
