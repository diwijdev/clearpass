import { useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

interface Props {
  activeTab?: 'details' | 'handoff'
  onTabChange?: (tab: 'details' | 'handoff') => void
}

function BottomNav({ activeTab, onTabChange }: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  const isPatientPage = location.pathname.startsWith('/patient/')

  const tabs = [
    {
      id: 'patients',
      label: 'Patients',
      icon: 'format_list_bulleted',
      isActive: !isPatientPage,
      onClick: () => navigate('/'),
    },
    {
      id: 'details',
      label: 'Details',
      icon: 'analytics',
      isActive: isPatientPage && activeTab === 'details',
      disabled: !isPatientPage,
      onClick: () => onTabChange?.('details'),
    },
    {
      id: 'handoff',
      label: 'Handoff',
      icon: 'ios_share',
      isActive: isPatientPage && activeTab === 'handoff',
      disabled: !isPatientPage,
      onClick: () => onTabChange?.('handoff'),
    },
  ]

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-3 pb-6 px-6 md:hidden backdrop-blur-xl rounded-t-2xl"
      style={{ backgroundColor: 'rgba(28, 32, 32, 0.85)' }}>
      {tabs.map(tab => (
        <motion.button
          key={tab.id}
          whileTap={{ scale: 0.9 }}
          onClick={tab.onClick}
          className={`relative flex flex-col items-center gap-1 transition-colors ${
            tab.disabled ? 'text-on-surface-variant opacity-40' :
            tab.isActive ? 'text-tertiary' : 'text-on-surface-variant'
          }`}>
          <motion.span
            animate={tab.isActive ? { scale: [1, 1.15, 1] } : { scale: 1 }}
            transition={{ duration: 0.25 }}
            className="material-symbols-outlined"
          >
            {tab.icon}
          </motion.span>
          <span className="text-[10px] font-bold tracking-widest uppercase">{tab.label}</span>
          {tab.isActive && (
            <motion.div
              layoutId="nav-indicator"
              className="absolute -bottom-1.5 h-0.5 w-6 rounded-full bg-tertiary"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </motion.button>
      ))}
    </nav>
  )
}

export default BottomNav
