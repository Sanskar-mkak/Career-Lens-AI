import GlassCard from "../ui/GlassCard";

const AICareerInsight = () => {
  return (
    <GlassCard className="ai-career-insight">
      <div className="dashboard-section-header">
        <div>
          <span className="dashboard-eyebrow">AI INSIGHT</span>
          <h2>Your Next Career Move</h2>
        </div>

        <span className="dashboard-section-icon">✦</span>
      </div>

      <div className="insight-content">
        <div className="insight-main">
          <span className="insight-label">STRONGEST OPPORTUNITY</span>

          <h3>Frontend Development</h3>

          <p>
            Your profile shows strong frontend capabilities. The next step is
            to strengthen your backend and system design skills to become a
            more complete full-stack candidate.
          </p>
        </div>

        <div className="insight-score">
          <span>90%</span>
          <small>Skill Strength</small>
        </div>
      </div>

      <div className="insight-recommendation">
        <div>
          <span className="insight-label">RECOMMENDED NEXT STEP</span>

          <p>
            Build 2 production-ready full-stack projects and strengthen your
            system design fundamentals.
          </p>
        </div>

        <button className="dashboard-action">
          View Career Roadmap →
        </button>
      </div>
    </GlassCard>
  );
};

export default AICareerInsight;