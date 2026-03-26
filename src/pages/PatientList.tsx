import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchPatients, fetchConditions } from '../services/fhirService'
import type { Patient, Condition } from '../types/fhir'
import TopBar from '../components/TopBar'
// import BottomNav from '../components/BottomNav'
import Sidebar from '../components/SideBar'
import { deriveStatus, statusConfig } from '../utils/patientStatus'

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [conditionsMap, setConditionsMap] = useState<Record<string, Condition[]>>({})
  const [filter, setFilter] = useState<'all' | 'critical' | 'stable'>('all')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [liveMode, setLiveMode] = useState(false)

  useEffect(() => {
    async function loadPatients() {
      setLoading(true)
      const data = await fetchPatients(liveMode)
      setPatients(data)
      setLoading(false)

      const entries = await Promise.all(
        data.map(async (p) => {
          const conditions = await fetchConditions(p.id)
          return [p.id, conditions] as [string, Condition[]]
        })
      )
      setConditionsMap(Object.fromEntries(entries))
    }
    loadPatients()
  }, [liveMode])

  const filtered = patients.filter(p => {
    const matchesSearch =
      p.name?.[0]?.family?.toLowerCase().includes(search.toLowerCase()) ||
      p.id?.includes(search)

    if (!matchesSearch) return false
    if (filter === 'all') return true

    const status = deriveStatus(conditionsMap[p.id] ?? [])
    if (filter === 'critical') return status === 'critical'
    if (filter === 'stable') return status === 'stable'
    return true
  })

  return (
    <div className="min-h-screen bg-surface">
      <TopBar onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content — offset for sidebar on desktop */}
      <main className="pt-20 pb-24 px-4 md:ml-72 max-w-2xl mx-auto md:mx-0">

        {/* Header */}
        <section className="mb-6 mt-2">
          <h2 className="text-2xl font-extrabold tracking-tight text-primary mb-1">Ward Patient List</h2>
          <div className="flex items-center gap-2 text-on-surface-variant">
            <span className="material-symbols-outlined text-sm">location_on</span>
            <span className="text-sm font-medium">
              Central Ward • {loading ? '...' : `${patients.length} Patients`}
            </span>
          </div>
        </section>

        {/* Data source toggle */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${liveMode ? 'bg-green-400 animate-pulse' : 'bg-outline'}`} />
            <span className="text-xs text-on-surface-variant font-medium">
              {liveMode ? 'Live FHIR Server' : 'Sample Data'}
            </span>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => setLiveMode(!liveMode)}
            className="text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full transition-colors"
            style={{
              backgroundColor: liveMode ? 'var(--color-primary-container)' : 'var(--color-surface-container-low)',
              color: liveMode ? 'var(--color-on-primary-container)' : 'var(--color-on-surface-variant)',
            }}>
            {liveMode ? 'Use Sample Data' : 'Try Live FHIR'}
          </motion.button>
        </div>

        {/* Search bar */}
        <section className="mb-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
            <input
              type="text"
              placeholder="Search by name or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full rounded-xl py-3 pl-10 pr-4 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary transition-all"
              style={{ backgroundColor: 'var(--color-surface-container-low)' }}
            />
          </div>
        </section>

        {/* Filter chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {[
            { key: 'all' as const, label: 'All Patients' },
            { key: 'critical' as const, label: 'Critical Only' },
            { key: 'stable' as const, label: 'Stable' },
          ].map(chip => (
            <motion.button
              key={chip.key}
              layout
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              onClick={() => setFilter(chip.key)}
              className={`px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase whitespace-nowrap transition-colors ${
                filter === chip.key
                  ? 'bg-primary text-on-primary'
                  : 'text-on-surface-variant'
              }`}
              style={filter !== chip.key ? { backgroundColor: 'var(--color-surface-container-low)' } : undefined}>
              {chip.label}
            </motion.button>
          ))}
        </div>

        {/* Patient list */}
        {loading ? (
          <p className="text-on-surface-variant">Loading patients...</p>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {filtered.map((patient, index) => {
              const conditionsLoaded = patient.id in conditionsMap
              const status = statusConfig[deriveStatus(conditionsMap[patient.id] ?? [])]
              return (
                <motion.div
                  key={patient.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25, delay: Math.min(index * 0.05, 0.4) }}
                  whileHover={{ scale: 1.015, boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(`/patient/${patient.id}`)}
                  className="p-5 rounded-xl border-l-4 cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-surface-container-lowest)',
                    borderLeftColor: status.border,
                  }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-primary">
                        {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}
                      </h3>
                      <p className="text-xs font-bold text-on-surface-variant tracking-widest uppercase">
                        ID-{patient.id}
                      </p>
                    </div>
                    <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter"
                      style={{
                        backgroundColor: conditionsLoaded ? status.bg : 'var(--color-surface-container-low)',
                        color: conditionsLoaded ? status.text : 'var(--color-on-surface-variant)',
                        borderLeftColor: conditionsLoaded ? status.border : 'var(--color-surface-container-low)',
                      }}>
                      {conditionsLoaded ? status.label : '...'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">Gender</span>
                      <p className="text-sm font-semibold text-primary capitalize">{patient.gender}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">DOB</span>
                      <p className="text-sm font-semibold text-primary">{patient.birthDate ?? 'N/A'}</p>
                    </div>
                    <div>
                      <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">Condition</span>
                      <p className="text-sm font-semibold text-primary truncate">
                        {conditionsLoaded
                          ? (conditionsMap[patient.id]?.[0]?.code?.text ?? 'None listed')
                          : 'Loading...'}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 flex justify-end"
                    style={{ borderTop: '1px solid var(--color-surface-container-low)' }}>
                    <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                      View Details
                      <span className="material-symbols-outlined text-sm">chevron_right</span>
                    </button>
                  </div>
                </motion.div>
              )})}
            </AnimatePresence>
          </div>
        )}
      </main>

      {/* <BottomNav /> */}
    </div>
  )
}

export default PatientList
