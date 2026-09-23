const activity = [
  { month: 'Mar', applications: 4 },
  { month: 'Apr', applications: 7 },
  { month: 'May', applications: 5 },
  { month: 'Jun', applications: 9 },
  { month: 'Jul', applications: 12 },
  { month: 'Aug', applications: 8 },
]

export default function CareerActivity() {
  return (
    <div className="career-activity-card">
      <div className="career-activity-header">
        <div>
          <span className="dashboard-card-label">
            ACTIVITY
          </span>

          <h3>Career Activity</h3>

          <p>
            Your application activity over the last 6 months.
          </p>
        </div>

        <span className="career-activity-icon">
          ✦
        </span>
      </div>

      <div className="activity-chart">
        <div className="activity-bars">
          {activity.map((item) => (
            <div
              className="activity-column"
              key={item.month}
            >
              <div className="activity-value">
                {item.applications}
              </div>

              <div className="activity-bar-track">
                <div
                  className="activity-bar-fill"
                  style={{
                    height: `${(item.applications / 12) * 100}%`,
                  }}
                />
              </div>

              <span className="activity-month">
                {item.month}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}