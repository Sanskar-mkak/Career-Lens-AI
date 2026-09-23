import { useTheme } from '../../context/ThemeContext'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      type="button"
      className="sidebar__action"
      onClick={toggleTheme}
      aria-label={`Switch to ${
        theme === 'dark' ? 'light' : 'dark'
      } mode`}
      title={`Switch to ${
        theme === 'dark' ? 'light' : 'dark'
      } mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  )
}

export default ThemeToggle