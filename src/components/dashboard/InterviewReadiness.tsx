import GlassCard from "../ui/GlassCard";

const InterviewReadiness = () => {
  return (
    <GlassCard className="interview-readiness">
      <div className="dashboard-section-header">
        <div>
          <span className="dashboard-eyebrow">INTERVIEW</span>
          <h2>Interview Readiness</h2>
        </div>

        <span className="dashboard-section-icon">◉</span>
      </div>

      <div className="readiness-score">
        <div className="readiness-circle">
          <span>74%</span>
        </div>

        <div className="readiness-content">
          <h3>You're getting there.</h3>
          <p>
            Your interview preparation is progressing well. Keep practicing
            to improve your confidence.
          </p>
        </div>
      </div>

      <div className="readiness-items">
        <div className="readiness-item">
          <span>Technical Questions</span>
          <strong>82%</strong>
        </div>

        <div className="readiness-item">
          <span>Communication</span>
          <strong>71%</strong>
        </div>

        <div className="readiness-item">
          <span>Problem Solving</span>
          <strong>68%</strong>
        </div>
      </div>

      <button className="dashboard-action">
        Start Mock Interview →
      </button>
    </GlassCard>
  );
};

export default InterviewReadiness;