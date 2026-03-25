import { useNavigate, useLocation } from 'react-router-dom'

interface Props {
  activeTab?: 'details' | 'handoff'
  onTabChange?: (tab: 'details' | 'handoff') => void
}

function BottomNav({ activeTab, onTabChange }: Props) {
  const navigate = useNavigate()
  const location = useLocation()

  const isPatientPage = location.pathname.startsWith('/patient/')

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-3 pb-6 px-6 md:hidden backdrop-blur-xl rounded-t-2xl"
      style={{ backgroundColor: 'rgba(28, 32, 32, 0.85)' }}>

      {/* Patients — always goes to list */}
      <button
        onClick={() => navigate('/')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          !isPatientPage ? 'text-tertiary' : 'text-on-surface-variant'
        }`}>
        <span className="material-symbols-outlined">format_list_bulleted</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Patients</span>
      </button>

      {/* Details */}
      <button
        onClick={() => onTabChange?.('details')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          isPatientPage
            ? activeTab === 'details' ? 'text-tertiary' : 'text-on-surface-variant'
            : 'text-on-surface-variant opacity-40'
        }`}>
        <span className="material-symbols-outlined">analytics</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Details</span>
      </button>

      {/* Handoff */}
      <button
        onClick={() => onTabChange?.('handoff')}
        className={`flex flex-col items-center gap-1 transition-colors ${
          isPatientPage
            ? activeTab === 'handoff' ? 'text-tertiary' : 'text-on-surface-variant'
            : 'text-on-surface-variant opacity-40'
        }`}>
        <span className="material-symbols-outlined">ios_share</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Handoff</span>
      </button>
    </nav>
  )
}

export default BottomNav