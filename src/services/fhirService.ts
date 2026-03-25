import axios from 'axios'
import type { Patient, Observation, Condition, FHIRBundle } from '../types/fhir'
import { mockPatients, mockObservations, mockConditions } from './mockData'

const BASE_URL = 'https://hapi.fhir.org/baseR4'

const fhirClient = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  headers: {
    'Content-Type': 'application/fhir+json',
  },
})

// --- Helpers ---

function deduplicatePatients(patients: Patient[]): Patient[] {
  const seen = new Set<string>()
  return patients.filter(p => {
    const given = p.name?.[0]?.given?.[0]?.toLowerCase() ?? ''
    const family = p.name?.[0]?.family?.toLowerCase() ?? ''
    const fullName = `${given} ${family}`
    if (!fullName.trim() || seen.has(fullName)) return false
    seen.add(fullName)
    return true
  })
}

function isMockId(id: string): boolean {
  return id.startsWith('mock-')
}

// --- Public API ---

export async function fetchPatients(useLiveFHIR = false): Promise<Patient[]> {
  if (!useLiveFHIR) return mockPatients

  try {
    const names = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis']
    const requests = names.map(name =>
      fhirClient.get<FHIRBundle<Patient>>(`/Patient?family=${name}&_count=2`)
        .catch(() => null)
    )
    const results = await Promise.all(requests)
    const patients = results
      .filter(r => r !== null)
      .flatMap(r => r.data.entry?.map(e => e.resource) ?? [])

    const unique = deduplicatePatients(patients)
    if (unique.length >= 5) return unique
    return mockPatients
  } catch {
    return mockPatients
  }
}

export async function fetchPatient(id: string): Promise<Patient> {
  if (isMockId(id)) {
    const found = mockPatients.find(p => p.id === id)
    if (found) return found
    throw new Error('Mock patient not found')
  }

  try {
    const response = await fhirClient.get<Patient>(`/Patient/${id}`)
    return response.data
  } catch {
    throw new Error('Patient not found')
  }
}

export async function fetchObservations(patientId: string): Promise<Observation[]> {
  if (isMockId(patientId)) {
    return mockObservations[patientId] ?? []
  }

  try {
    const response = await fhirClient.get<FHIRBundle<Observation>>(
      `/Observation?subject=${patientId}&_count=20&_sort=-date`
    )
    return response.data.entry?.map(e => e.resource) ?? []
  } catch {
    return []
  }
}

export async function fetchConditions(patientId: string): Promise<Condition[]> {
  if (isMockId(patientId)) {
    return mockConditions[patientId] ?? []
  }

  try {
    const response = await fhirClient.get<FHIRBundle<Condition>>(
      `/Condition?subject=${patientId}&_count=10`
    )
    return response.data.entry?.map(e => e.resource) ?? []
  } catch {
    return []
  }
}

export default fhirClient