interface Props {
  onMenuClick?: () => void
}

function TopBar({ onMenuClick }: Props) {
  return (
    <header className="fixed top-0 w-full z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md"
      style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-full hover:bg-surface-container transition-colors md:hidden">
          <span className="material-symbols-outlined text-on-surface">menu</span>
        </button>
        <h1 className="text-xl font-bold tracking-tighter text-on-surface">ClearPass</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center">
          <span className="material-symbols-outlined text-on-surface-variant text-sm">person</span>
        </div>
      </div>
    </header>
  )
}

export default TopBar