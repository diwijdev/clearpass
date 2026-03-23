export interface Patient {
  id: string
  resourceType: 'Patient'
  name: Array<{
    given: string[]
    family: string
  }>
  gender: string
  birthDate: string
}

export interface FHIRBundle<T> {
  resourceType: 'Bundle'
  entry: Array<{
    resource: T
  }>
}

export interface Observation {
  id: string
  resourceType: 'Observation'
  code: {
    text: string
    coding: Array<{ display: string }>
  }
  valueQuantity?: {
    value: number
    unit: string
  }
  valueString?: string
  status: string
  effectiveDateTime: string
}

export interface Condition {
  id: string
  resourceType: 'Condition'
  code: {
    text: string
    coding: Array<{ display: string }>
  }
  clinicalStatus: {
    coding: Array<{ code: string }>
  }
}