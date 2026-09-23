import React from 'react';
import styles from '../LandingPage.module.css';

export const TrustStrip: React.FC = () => {
  return (
    <section className={styles.trustSection} aria-label="Target Opportunities at Leading Companies">
      <div className={styles.contentWrapper}>
        <div className={styles.trustHeading}>Targeting Opportunities At Leading Companies</div>

        <div className={styles.logoGrid} role="list">
          {/* Google */}
          <div className={styles.logoItem} role="listitem">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Google" role="img">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17Z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24Z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15Z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98Z"
              />
            </svg>
            <span>Google</span>
          </div>

          {/* Microsoft */}
          <div className={styles.logoItem} role="listitem">
            <svg width="22" height="22" viewBox="0 0 22 22" aria-label="Microsoft" role="img">
              <rect x="0" y="0" width="10" height="10" fill="#F25022" />
              <rect x="12" y="0" width="10" height="10" fill="#7FBA00" />
              <rect x="0" y="12" width="10" height="10" fill="#00A4EF" />
              <rect x="12" y="12" width="10" height="10" fill="#FFB900" />
            </svg>
            <span>Microsoft</span>
          </div>

          {/* Amazon */}
          <div className={styles.logoItem} role="listitem">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Amazon" role="img">
              <path
                fill="currentColor"
                d="M13.9 14.5c-2.3 1.7-5.7 2.6-8.6 2.6-4 0-7.7-1.5-10.4-4-.2-.2-.2-.5 0-.7.3-.2.6-.2.8 0 2.5 2.3 5.8 3.7 9.6 3.7 2.6 0 5.6-.8 7.7-2.3.4-.3.9.1.9.7z"
              />
              <path
                fill="#FF9900"
                d="M15.4 12.8c-.3-.4-1.9-.2-2.6-.1-.2 0-.3-.2-.1-.3 1.1-.9 2.9-.6 3.2-.3.3.3.1 2.2-.9 3.2-.2.2-.3.1-.2-.1.3-.7.9-2.1.6-2.4z"
              />
            </svg>
            <span>amazon</span>
          </div>

          {/* Meta */}
          <div className={styles.logoItem} role="listitem">
            <svg width="24" height="24" viewBox="0 0 24 24" aria-label="Meta" role="img">
              <path
                fill="#0668E1"
                d="M12 4.2C7.3 4.2 4.8 7.8 4.8 12c0 4.1 2.7 7.8 7.2 7.8 2.5 0 4.5-1.1 5.9-2.9 1.4 1.8 3.4 2.9 5.9 2.9 4.5 0 7.2-3.7 7.2-7.8 0-4.2-2.5-7.8-7.2-7.8-2.6 0-4.6 1.2-6 3-1.4-1.8-3.4-3-5.8-3zm0 3.2c1.7 0 3.2 1.3 4.2 3.4-1 2.2-2.5 3.6-4.2 3.6-2.7 0-4.2-2.1-4.2-4.6 0-2.6 1.6-4.6 4.2-4.6zm11.8 4.6c0 2.5-1.5 4.6-4.2 4.6-1.7 0-3.2-1.4-4.2-3.6 1-2.1 2.5-3.4 4.2-3.4 2.6 0 4.2 2 4.2 4.4z"
                transform="scale(0.7) translate(2, 4)"
              />
            </svg>
            <span>Meta</span>
          </div>

          {/* Adobe */}
          <div className={styles.logoItem} role="listitem">
            <svg width="22" height="22" viewBox="0 0 24 24" aria-label="Adobe" role="img">
              <path fill="#FA0F00" d="M13.96 4.4H24v15.2H18.78l-4.82-15.2zm-3.92 0H0v15.2h5.22l4.82-15.2zM12 11.23l2.84 8.37H11.5l-1.3-4.14h3.64l-.94-2.85-.9 2.85z" />
            </svg>
            <span>Adobe</span>
          </div>

          {/* Apple */}
          <div className={styles.logoItem} role="listitem">
            <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Apple" role="img">
              <path
                fill="currentColor"
                d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-1 2.93 1.07.08 2.15-.53 2.81-1.33z"
              />
            </svg>
            <span>Apple</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustStrip;
