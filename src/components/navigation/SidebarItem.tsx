import type { ReactNode } from 'react'

interface SidebarItemProps {
  icon: ReactNode
  label: string
  active?: boolean
  onClick?: () => void
}

function SidebarItem({
  icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) {
  return (
    <button
      type="button"
      className={`sidebar-item ${active ? 'sidebar-item-active' : ''}`}
      onClick={onClick}
    >
      <span className="sidebar-item-icon">
        {icon}
      </span>

      <span className="sidebar-item-label">
        {label}
      </span>
    </button>
  )
}

export default SidebarItem