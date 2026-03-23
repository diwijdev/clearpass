import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchPatients } from '../services/fhirService'
import type { Patient } from '../types/fhir'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'
import Sidebar from '../components/SideBar'

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    async function loadPatients() {
      const data = await fetchPatients()
      setPatients(data)
      setLoading(false)
    }
    loadPatients()
  }, [])

  const filtered = patients.filter(p =>
    p.name?.[0]?.family?.toLowerCase().includes(search.toLowerCase()) ||
    p.id?.includes(search)
  )

  return (
    <div className="min-h-screen bg-surface">
      <TopBar />
      <Sidebar />

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

        {/* Search bar */}
        <section className="flex gap-2 mb-6">
          <div className="relative flex-1">
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
          <button className="p-3 rounded-xl transition-colors"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
            <span className="material-symbols-outlined text-primary">tune</span>
          </button>
        </section>

        {/* Filter chips */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          <button className="px-4 py-2 rounded-full bg-primary text-on-primary text-xs font-bold tracking-wider uppercase whitespace-nowrap">
            All Patients
          </button>
          <button className="px-4 py-2 rounded-full text-on-surface-variant text-xs font-bold tracking-wider uppercase whitespace-nowrap"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
            Critical Only
          </button>
          <button className="px-4 py-2 rounded-full text-on-surface-variant text-xs font-bold tracking-wider uppercase whitespace-nowrap"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}>
            Pending Discharge
          </button>
        </div>

        {/* Patient list */}
        {loading ? (
          <p className="text-on-surface-variant">Loading patients...</p>
        ) : (
          <div className="space-y-4">
            {filtered.map(patient => (
              <div
                key={patient.id}
                onClick={() => navigate(`/patient/${patient.id}`)}
                className="p-5 rounded-xl border-l-4 border-tertiary-fixed-dim cursor-pointer hover:shadow-md transition-all"
                style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
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
                    style={{ backgroundColor: 'var(--color-tertiary-fixed-dim)', color: 'var(--color-on-tertiary-fixed)' }}>
                    Stable
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">Gender</span>
                    <p className="text-sm font-semibold text-primary capitalize">{patient.gender}</p>
                  </div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-on-surface-variant mb-0.5">DOB</span>
                    <p className="text-sm font-semibold text-primary">{patient.birthDate ?? 'N/A'}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 flex justify-end"
                  style={{ borderTop: '1px solid var(--color-surface-container-low)' }}>
                  <button className="text-primary text-xs font-bold flex items-center gap-1 hover:underline">
                    View Handoff
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  )
}

export default PatientList