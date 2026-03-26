import { motion } from 'framer-motion'

function SplashScreen() {
  return (
    <motion.div
      exit={{ opacity: 0, scale: 1.03 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-surface"
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="flex items-center gap-4"
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-primary">
          ClearPass
        </h1>
        <img src="/logo-transparent.png" alt="" className="h-10 w-auto shrink-0" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-3 text-sm text-on-surface-variant"
      >
        Structured shift handoffs. Safer patient care.
      </motion.p>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, rotate: 360 }}
        transition={{
          opacity: { delay: 0.5, duration: 0.3 },
          rotate: { delay: 0.5, duration: 1.2, repeat: Infinity, ease: 'linear' },
        }}
        className="material-symbols-outlined mt-8 text-primary text-2xl"
      >
        autorenew
      </motion.span>
    </motion.div>
  )
}

export default SplashScreen
