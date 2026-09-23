import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: ReactNode;
  trend?: string;
}

export default function StatCard({
  title,
  value,
  description,
  icon,
  trend,
}: StatCardProps) {
  return (
    <div className="dashboard-stat-card">
      <div className="stat-card-header">
        <span className="stat-card-title">{title}</span>
        <span className="stat-card-icon">{icon}</span>
      </div>

      <div className="stat-card-value">{value}</div>

      <div className="stat-card-footer">
        <span>{description}</span>
        {trend && <span className="stat-card-trend">{trend}</span>}
      </div>
    </div>
  );
}