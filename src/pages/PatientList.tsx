import { useEffect, useState } from 'react'
import { fetchPatients } from '../services/fhirService'
import type { Patient } from '../types/fhir'

function PatientList() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadPatients() {
      const data = await fetchPatients()
      setPatients(data)
      setLoading(false)
    }

    loadPatients()
  }, [])

  if (loading) {
    return <div className="p-4">Loading patients...</div>
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Ward Patients</h1>
      {patients.map(patient => (
        <div key={patient.id} className="border p-3 mb-2 rounded">
          <p>Name: {patient.name?.[0]?.given?.[0]} {patient.name?.[0]?.family}</p>
          <p>ID: {patient.id}</p>
          <p>Gender: {patient.gender}</p>
        </div>
      ))}
    </div>
  )
}

export default PatientList