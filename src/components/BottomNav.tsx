import { useNavigate, useLocation } from 'react-router-dom'

function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center pt-3 pb-6 px-6 md:hidden backdrop-blur-xl rounded-t-2xl"
      style={{ backgroundColor: 'rgba(28, 32, 32, 0.85)' }}>
      <button
        onClick={() => navigate('/')}
        className={`flex flex-col items-center gap-1 ${location.pathname === '/' ? 'text-tertiary' : 'text-on-surface-variant'}`}>
        <span className="material-symbols-outlined">format_list_bulleted</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Patients</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-on-surface-variant">
        <span className="material-symbols-outlined">analytics</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Details</span>
      </button>
      <button className="flex flex-col items-center gap-1 text-on-surface-variant">
        <span className="material-symbols-outlined">ios_share</span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Handoff</span>
      </button>
    </nav>
  )
}

export default BottomNav