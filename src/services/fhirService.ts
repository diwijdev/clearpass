import axios from 'axios'
import type { Patient, FHIRBundle } from '../types/fhir'

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

export default fhirClient