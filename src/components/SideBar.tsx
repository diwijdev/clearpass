import { motion, AnimatePresence } from 'framer-motion'

interface Props {
  isOpen?: boolean
  onClose?: () => void
}

function Sidebar({ isOpen, onClose }: Props) {
  const sidebarContent = (
    <>
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
    </>
  )

  return (
    <>
      {/* Desktop sidebar — always visible */}
      <aside
        className="hidden md:flex fixed left-0 top-0 h-full z-40 flex-col gap-6 p-6 pt-20 w-72"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
        {sidebarContent}
      </aside>

      {/* Mobile sidebar + backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="sidebar-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              onClick={onClose}
            />
            <motion.aside
              key="sidebar-panel"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-full z-50 flex flex-col gap-6 p-6 pt-20 w-72 md:hidden"
              style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-4 p-1 rounded-full text-on-surface-variant hover:text-primary transition-colors">
                <span className="material-symbols-outlined">close</span>
              </motion.button>
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Sidebar
