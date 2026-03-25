import type { Patient, Observation, Condition } from '../types/fhir'

export const mockPatients: Patient[] = [
  {
    id: 'mock-001',
    resourceType: 'Patient',
    name: [{ given: ['Maria'], family: 'Santos' }],
    gender: 'female',
    birthDate: '1958-03-14',
  },
  {
    id: 'mock-002',
    resourceType: 'Patient',
    name: [{ given: ['James'], family: 'Whitfield' }],
    gender: 'male',
    birthDate: '1971-09-22',
  },
  {
    id: 'mock-003',
    resourceType: 'Patient',
    name: [{ given: ['Anika'], family: 'Patel' }],
    gender: 'female',
    birthDate: '1985-06-30',
  },
  {
    id: 'mock-004',
    resourceType: 'Patient',
    name: [{ given: ['Robert'], family: 'Okafor' }],
    gender: 'male',
    birthDate: '1949-12-05',
  },
  {
    id: 'mock-005',
    resourceType: 'Patient',
    name: [{ given: ['Susan'], family: 'Tremblay' }],
    gender: 'female',
    birthDate: '1993-01-18',
  },
  {
    id: 'mock-006',
    resourceType: 'Patient',
    name: [{ given: ['David'], family: 'Nakamura' }],
    gender: 'male',
    birthDate: '1967-07-11',
  },
  {
    id: 'mock-007',
    resourceType: 'Patient',
    name: [{ given: ['Elena'], family: 'Vasquez' }],
    gender: 'female',
    birthDate: '1974-04-25',
  },
  {
    id: 'mock-008',
    resourceType: 'Patient',
    name: [{ given: ['Thomas'], family: 'Anderson' }],
    gender: 'male',
    birthDate: '1982-11-03',
  },
]

export const mockObservations: Record<string, Observation[]> = {
  'mock-001': [
    { id: 'obs-001', resourceType: 'Observation', code: { text: 'Heart Rate', coding: [{ display: 'Heart Rate' }] }, valueQuantity: { value: 92, unit: 'bpm' }, status: 'final', effectiveDateTime: '2025-03-24T08:00:00Z' },
    { id: 'obs-002', resourceType: 'Observation', code: { text: 'Blood Pressure', coding: [{ display: 'Blood Pressure' }] }, valueString: '148/94 mmHg', status: 'final', effectiveDateTime: '2025-03-24T08:00:00Z' },
    { id: 'obs-003', resourceType: 'Observation', code: { text: 'Temperature', coding: [{ display: 'Temperature' }] }, valueQuantity: { value: 37.8, unit: '°C' }, status: 'final', effectiveDateTime: '2025-03-24T08:00:00Z' },
    { id: 'obs-004', resourceType: 'Observation', code: { text: 'SpO2', coding: [{ display: 'SpO2' }] }, valueQuantity: { value: 94, unit: '%' }, status: 'final', effectiveDateTime: '2025-03-24T08:00:00Z' },
  ],
  'mock-002': [
    { id: 'obs-005', resourceType: 'Observation', code: { text: 'Heart Rate', coding: [{ display: 'Heart Rate' }] }, valueQuantity: { value: 78, unit: 'bpm' }, status: 'final', effectiveDateTime: '2025-03-24T06:30:00Z' },
    { id: 'obs-006', resourceType: 'Observation', code: { text: 'Blood Pressure', coding: [{ display: 'Blood Pressure' }] }, valueString: '132/86 mmHg', status: 'final', effectiveDateTime: '2025-03-24T06:30:00Z' },
    { id: 'obs-007', resourceType: 'Observation', code: { text: 'Temperature', coding: [{ display: 'Temperature' }] }, valueQuantity: { value: 36.9, unit: '°C' }, status: 'final', effectiveDateTime: '2025-03-24T06:30:00Z' },
    { id: 'obs-008', resourceType: 'Observation', code: { text: 'Respiratory Rate', coding: [{ display: 'Respiratory Rate' }] }, valueQuantity: { value: 18, unit: '/min' }, status: 'final', effectiveDateTime: '2025-03-24T06:30:00Z' },
  ],
  'mock-003': [
    { id: 'obs-009', resourceType: 'Observation', code: { text: 'Heart Rate', coding: [{ display: 'Heart Rate' }] }, valueQuantity: { value: 68, unit: 'bpm' }, status: 'final', effectiveDateTime: '2025-03-24T09:00:00Z' },
    { id: 'obs-010', resourceType: 'Observation', code: { text: 'Blood Pressure', coding: [{ display: 'Blood Pressure' }] }, valueString: '118/76 mmHg', status: 'final', effectiveDateTime: '2025-03-24T09:00:00Z' },
  ],
  'mock-004': [
    { id: 'obs-011', resourceType: 'Observation', code: { text: 'Heart Rate', coding: [{ display: 'Heart Rate' }] }, valueQuantity: { value: 110, unit: 'bpm' }, status: 'final', effectiveDateTime: '2025-03-24T07:00:00Z' },
    { id: 'obs-012', resourceType: 'Observation', code: { text: 'Blood Pressure', coding: [{ display: 'Blood Pressure' }] }, valueString: '162/98 mmHg', status: 'final', effectiveDateTime: '2025-03-24T07:00:00Z' },
    { id: 'obs-013', resourceType: 'Observation', code: { text: 'SpO2', coding: [{ display: 'SpO2' }] }, valueQuantity: { value: 89, unit: '%' }, status: 'final', effectiveDateTime: '2025-03-24T07:00:00Z' },
    { id: 'obs-014', resourceType: 'Observation', code: { text: 'Temperature', coding: [{ display: 'Temperature' }] }, valueQuantity: { value: 38.9, unit: '°C' }, status: 'final', effectiveDateTime: '2025-03-24T07:00:00Z' },
  ],
}

export const mockConditions: Record<string, Condition[]> = {
  'mock-001': [
    { id: 'cond-001', resourceType: 'Condition', code: { text: 'Hypertension', coding: [{ display: 'Hypertension' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
    { id: 'cond-002', resourceType: 'Condition', code: { text: 'Type 2 Diabetes', coding: [{ display: 'Type 2 Diabetes' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
    { id: 'cond-003', resourceType: 'Condition', code: { text: 'Chronic Kidney Disease', coding: [{ display: 'Chronic Kidney Disease' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
  ],
  'mock-002': [
    { id: 'cond-004', resourceType: 'Condition', code: { text: 'Post-op ACL Repair', coding: [{ display: 'Post-op ACL Repair' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
  ],
  'mock-003': [],
  'mock-004': [
    { id: 'cond-005', resourceType: 'Condition', code: { text: 'Congestive Heart Failure', coding: [{ display: 'Congestive Heart Failure' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
    { id: 'cond-006', resourceType: 'Condition', code: { text: 'COPD', coding: [{ display: 'COPD' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
    { id: 'cond-007', resourceType: 'Condition', code: { text: 'Atrial Fibrillation', coding: [{ display: 'Atrial Fibrillation' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
    { id: 'cond-008', resourceType: 'Condition', code: { text: 'Pneumonia', coding: [{ display: 'Pneumonia' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
  ],
  'mock-005': [
    { id: 'cond-009', resourceType: 'Condition', code: { text: 'Appendectomy Recovery', coding: [{ display: 'Appendectomy Recovery' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
  ],
  'mock-006': [
    { id: 'cond-010', resourceType: 'Condition', code: { text: 'Lumbar Disc Herniation', coding: [{ display: 'Lumbar Disc Herniation' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
    { id: 'cond-011', resourceType: 'Condition', code: { text: 'Osteoarthritis', coding: [{ display: 'Osteoarthritis' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
  ],
  'mock-007': [
    { id: 'cond-012', resourceType: 'Condition', code: { text: 'Gestational Diabetes', coding: [{ display: 'Gestational Diabetes' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
    { id: 'cond-013', resourceType: 'Condition', code: { text: 'Preeclampsia', coding: [{ display: 'Preeclampsia' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
    { id: 'cond-014', resourceType: 'Condition', code: { text: 'Iron Deficiency Anemia', coding: [{ display: 'Iron Deficiency Anemia' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
  ],
  'mock-008': [
    { id: 'cond-015', resourceType: 'Condition', code: { text: 'Fractured Tibia', coding: [{ display: 'Fractured Tibia' }] }, clinicalStatus: { coding: [{ code: 'active' }] } },
  ],
}