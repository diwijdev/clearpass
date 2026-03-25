export interface HandoffNote {
  id: string
  patient_id: string
  note: string
  clinician_name: string
  created_at: string
}

export interface ADLNote {
  id: string
  patient_id: string
  mobility: 'ambulatory' | 'wheelchair' | 'bedridden'
  continence: 'independent' | 'assisted' | 'catheter'
  feeding: 'independent' | 'assisted' | 'NGT'
  care_instructions: string
  updated_at: string
}

export interface PendingTask {
  id: string
  patient_id: string
  task: string
  priority: 'high' | 'medium' | 'low'
  completed: boolean
  created_at: string
}