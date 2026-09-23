export default function SkillProgress() {
  const skills = [
    { name: "Frontend Development", value: 90 },
    { name: "Backend Development", value: 72 },
    { name: "Data Structures & Algorithms", value: 61 },
  ];

  return (
    <div className="skill-progress-card">
      <div className="skill-progress-header">
        <div>
          <span className="dashboard-card-label">SKILLS</span>
          <h3>Skill Progress</h3>
        </div>

        <span className="skill-progress-icon">✦</span>
      </div>

      <div className="skills-list">
        {skills.map((skill) => (
          <div className="skill-row" key={skill.name}>
            <div className="skill-row-top">
              <span>{skill.name}</span>
              <span>{skill.value}%</span>
            </div>

            <div className="skill-bar">
              <div
                className="skill-bar-fill"
                style={{ width: `${skill.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}