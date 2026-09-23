import type { ReactNode } from 'react'
import Sidebar from '../components/navigation/Sidebar'
import TopBar from '../components/navigation/TopBar'


interface AppShellProps {
  children: ReactNode
}

function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />

      <div className="app-main">
        <TopBar />

        <main className="app-content">
          {children}
        </main>
      </div>
    </div>
  )
}

export default AppShell