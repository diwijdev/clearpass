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