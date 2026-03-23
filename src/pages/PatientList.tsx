import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { fetchPatients } from '../services/fhirService'
import type { Patient } from '../types/fhir'

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    async function loadPatients() {
      const data = await fetchPatients()
      setPatients(data)
      setLoading(false)
    }
    loadPatients()
  }, [])

  return (
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-64 min-h-screen p-6 flex flex-col gap-8 bg-surface-container-low">
        <div>
          <h1 className="text-white text-xl font-semibold tracking-tight">ClearPass</h1>
          <p className="text-white/50 text-xs mt-1 uppercase tracking-widest">Shift Handoff</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Ward</p>
          <p className="text-white font-medium">General Medicine</p>
          <p className="text-white/50 text-sm">Floor 3 — East Wing</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Current Shift</p>
          <p className="text-white font-medium">Morning</p>
          <p className="text-white/50 text-sm">07:00 — 19:00</p>
        </div>
        <div className="mt-auto flex flex-col gap-1">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Clinician</p>
          <p className="text-white font-medium">Dr. Sarah Chen</p>
          <p className="text-white/50 text-sm">Attending Physician</p>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8 bg-surface">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-primary tracking-tight">Ward Patients</h2>
          <p className="text-on-surface-variant text-sm mt-1">
            {loading ? 'Loading...' : `${patients.length} patients on ward`}
          </p>
        </div>

        {loading ? (
          <p className="text-on-surface-variant">Loading patients...</p>
        ) : (
          <div className="flex flex-col gap-3">
            {patients.map(patient => (
              <div
                key={patient.id}
                onClick={() => navigate(`/patient/${patient.id}`)}
                className="bg-surface-container-high rounded-md p-5 cursor-pointer transition-colors hover:bg-surface-container-low"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-on-surface tracking-tight">
                      {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}
                    </p>
                    <p className="text-on-surface-variant text-sm mt-0.5">
                      ID: {patient.id} · {patient.gender}
                    </p>
                  </div>
                  <span className="bg-tertiary/10 text-tertiary rounded-full px-3 py-1 text-xs font-medium uppercase tracking-widest">
                    Stable
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

    </div>
  )
}

export default PatientList
