import axios from 'axios'
import type { Patient, Observation, Condition, FHIRBundle } from '../types/fhir'

const BASE_URL = 'https://hapi.fhir.org/baseR4'

const fhirClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/fhir+json',
  },
})

export async function fetchPatients(): Promise<Patient[]> {
  const response = await fhirClient.get<FHIRBundle<Patient>>('/Patient?_count=20')
  return response.data.entry.map(entry => entry.resource)
}

export async function fetchPatient(id: string): Promise<Patient> {
  const response = await fhirClient.get<Patient>(`/Patient/${id}`)
  return response.data
}

export async function fetchObservations(patientId: string): Promise<Observation[]> {
  const response = await fhirClient.get<FHIRBundle<Observation>>(
    `/Observation?subject=${patientId}&_count=20&_sort=-date`
  )
  return response.data.entry?.map(e => e.resource) ?? []
}

export async function fetchConditions(patientId: string): Promise<Condition[]> {
  const response = await fhirClient.get<FHIRBundle<Condition>>(
    `/Condition?subject=${patientId}&_count=10`
  )
  return response.data.entry?.map(e => e.resource) ?? []
}

export default fhirClient