import React from 'react';
import { Navbar } from './sections/Navbar';
import { HeroSection } from './sections/HeroSection';
import { TrustStrip } from './sections/TrustStrip';
import { FeatureGrid } from './sections/FeatureGrid';
import { ProductPreview } from './sections/ProductPreview';
import { JourneyTeaser } from './sections/JourneyTeaser';
import { Footer } from './sections/Footer';
import styles from './LandingPage.module.css';

export const LandingPage: React.FC = () => {
  return (
    <div className={styles.pageContainer}>
      {/* Section 1: Navbar */}
      <Navbar />

      <main id="main-content">
        {/* Section 2: Hero */}
        <HeroSection />

        {/* Section 3: Target Opportunities / Company Logo Strip */}
        <TrustStrip />

        {/* Section 4: Core Capabilities */}
        <FeatureGrid />

        {/* Section 5: Why CareerLens / Product Preview */}
        <ProductPreview />

        {/* Section 6: More Than a Tool / Final CTA */}
        <JourneyTeaser />
      </main>

      {/* Section 7: Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
