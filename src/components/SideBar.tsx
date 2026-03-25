interface Props {
  isOpen?: boolean
  onClose?: () => void
}

function Sidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Backdrop overlay — mobile only, when open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-full z-50 flex flex-col gap-6 p-6 pt-20 w-72 transition-transform duration-300
          md:translate-x-0 md:z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}>

        {/* Close button — mobile only */}
        <button
          onClick={onClose}
          className="absolute top-6 right-4 p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors md:hidden">
          <span className="material-symbols-outlined">close</span>
        </button>

        <div className="flex flex-col gap-1 px-2">
          <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant">Current Facility</p>
          <h2 className="text-primary font-bold text-lg">Central Ward</h2>
          <div className="mt-2 p-3 rounded-xl bg-surface-container">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm text-tertiary">schedule</span>
              <span className="text-sm font-medium text-on-surface">Day Shift</span>
            </div>
            <p className="text-xs text-on-surface-variant ml-6">08:00 - 20:00</p>
          </div>
        </div>

        <nav className="flex flex-col gap-1">
          <a href="/" onClick={onClose} className="flex items-center gap-3 p-3 bg-surface-container text-tertiary rounded-lg">
            <span className="material-symbols-outlined">group</span>
            <span className="text-sm font-medium tracking-wide uppercase">Patient List</span>
          </a>
          <div className="flex items-center gap-3 p-3 text-on-surface-variant opacity-40 cursor-default">
            <span className="material-symbols-outlined">domain</span>
            <span className="text-sm font-medium tracking-wide uppercase">Ward Overview</span>
            <span className="ml-auto text-[9px] font-bold tracking-widest uppercase">Soon</span>
          </div>
          <div className="flex items-center gap-3 p-3 text-on-surface-variant opacity-40 cursor-default">
            <span className="material-symbols-outlined">assignment</span>
            <span className="text-sm font-medium tracking-wide uppercase">Shift Reports</span>
            <span className="ml-auto text-[9px] font-bold tracking-widest uppercase">Soon</span>
          </div>
        </nav>
      </aside>
    </>
  )
}

export default Sidebar