import StatCard from "./StatCard";
import "../../styles/dashboard.css";
import SkillProgress from "./SkillProgress";
import CareerActivity from './CareerActivity'
import InterviewReadiness from "./InterviewReadiness";
import AICareerInsight from "./AICareerInsight";

export default function Dashboard() {
  return (
    <section className="dashboard-grid">

      <StatCard
        title="Resume Score"
        value="82"
        description="ATS compatibility"
        trend="+8%"
        icon="✦"
      />

      <StatCard
        title="Profile Strength"
        value="78%"
        description="Your profile is strong"
        trend="+12%"
        icon="◈"
      />

      <StatCard
        title="Applications"
        value="12"
        description="Active applications"
        icon="▱"
      />

      <SkillProgress />
      <CareerActivity />
      <InterviewReadiness />
      <AICareerInsight />

    </section>
  );
}