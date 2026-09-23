import SidebarItem from './SidebarItem'
import ThemeToggle from '../ui/ThemeToggle'

function Sidebar() {
    return (
        <aside className="sidebar glass-card">

            {/* Brand */}
            <div className="sidebar-brand">
                <div className="sidebar-logo">
                    CL
                </div>

                <div>
                    <h2>
                        CareerLens <span>AI</span>
                    </h2>

                    <p>
                        Your Career. Powered by AI.
                    </p>
                </div>
            </div>


            {/* Main Navigation */}
            <nav className="sidebar-navigation">

                <SidebarItem
                    icon="⌂"
                    label="Dashboard"
                    active
                />

                <SidebarItem
                    icon="▣"
                    label="AI Resume Analyzer"
                />

                <SidebarItem
                    icon="◉"
                    label="Mock Interview"
                />

                <SidebarItem
                    icon="✣"
                    label="Job Match Finder"
                />

                <SidebarItem
                    icon="⌁"
                    label="Career Roadmap"
                />

                <SidebarItem
                    icon="◇"
                    label="Skill Builder"
                />

                <SidebarItem
                    icon="✎"
                    label="Cover Letter AI"
                />

                <SidebarItem
                    icon="▱"
                    label="Applications"
                />

                <SidebarItem
                    icon="♡"
                    label="Saved Jobs"
                />

            </nav>


            {/* Upgrade Card */}
            <div className="sidebar-upgrade">

                <div className="sidebar-upgrade-icon">
                    ✦
                </div>

                <h3>
                    Upgrade to Pro
                </h3>

                <p>
                    Unlock unlimited scans,
                    AI insights, and premium tools.
                </p>

                <button className="sidebar-upgrade-button">
                    Upgrade Now
                </button>

            </div>


            {/* Profile */}
            <div className="sidebar-profile">

                <div className="sidebar-avatar">
                    SK
                </div>

                <div className="sidebar-profile-info">
                    <strong>
                        Sanskar K.
                    </strong>

                    <span>
                        View Profile
                    </span>
                </div>

                <span className="sidebar-profile-arrow">
                    →
                </span>

            </div>


            {/* Bottom Actions */}
            <div className="sidebar-footer">

                <ThemeToggle />

                <button
                    type="button"
                    aria-label="Settings"
                >
                    ⚙
                </button>

                <button
                    type="button"
                    aria-label="Logout"
                >
                    ⇥
                </button>

            </div>

        </aside>
    )
}

export default Sidebar