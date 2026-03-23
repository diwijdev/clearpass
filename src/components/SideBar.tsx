function Sidebar() {
  return (
    <aside className="hidden md:flex w-72 fixed left-0 top-0 h-full z-40 flex-col gap-6 p-6 pt-20"
      style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
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
        <a href="/" className="flex items-center gap-3 p-3 bg-surface-container text-tertiary rounded-lg">
          <span className="material-symbols-outlined">group</span>
          <span className="text-sm font-medium tracking-wide uppercase">Patient List</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-on-surface-variant hover:pl-5 transition-all">
          <span className="material-symbols-outlined">domain</span>
          <span className="text-sm font-medium tracking-wide uppercase">Ward Overview</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 text-on-surface-variant hover:pl-5 transition-all">
          <span className="material-symbols-outlined">assignment</span>
          <span className="text-sm font-medium tracking-wide uppercase">Shift Reports</span>
        </a>
      </nav>
    </aside>
  )
}

export default Sidebar