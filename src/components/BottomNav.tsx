import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function BottomNav() {
  const navigate = useNavigate()

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-center items-center pt-3 pb-6 px-6 md:hidden backdrop-blur-xl rounded-t-2xl"
      style={{ backgroundColor: 'rgba(28, 32, 32, 0.85)' }}>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => navigate('/')}
        className="relative flex flex-col items-center gap-1 text-tertiary">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 0.25 }}
          className="material-symbols-outlined"
        >
          format_list_bulleted
        </motion.span>
        <span className="text-[10px] font-bold tracking-widest uppercase">Patients</span>
        <motion.div
          layoutId="nav-indicator"
          className="absolute -bottom-1.5 h-0.5 w-6 rounded-full bg-tertiary"
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        />
      </motion.button>
    </nav>
  )
}

export default BottomNav
