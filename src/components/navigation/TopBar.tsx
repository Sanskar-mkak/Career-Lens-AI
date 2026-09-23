import IconButton from '../ui/IconButton'

function TopBar() {
  return (
    <header className="topbar">
      <div className="topbar__actions">
        <IconButton label="Search">
          <span aria-hidden="true">⌕</span>
        </IconButton>

        <IconButton label="Notifications">
          <span aria-hidden="true">♧</span>
        </IconButton>

        <button
          type="button"
          className="topbar__profile"
          aria-label="Open profile menu"
        >
          <span className="topbar__avatar">SK</span>

          <span className="topbar__profile-info">
            <strong>Sanskar K.</strong>
            <small>CareerLens User</small>
          </span>

          <span className="topbar__chevron" aria-hidden="true">
            ⌄
          </span>
        </button>
      </div>
    </header>
  )
}

export default TopBar