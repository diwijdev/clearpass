import { createClient } from '@supabase/supabase-js'
import type { HandoffNote, ADLNote, PendingTask } from '../types/handoff'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)

export async function fetchHandoffNotes(patientId: string): Promise<HandoffNote[]> {
  const { data, error } = await supabase
    .from('handoff_notes')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function saveHandoffNote(patientId: string, note: string, clinicianName: string): Promise<void> {
  const { error } = await supabase
    .from('handoff_notes')
    .insert({ patient_id: patientId, note, clinician_name: clinicianName })

  if (error) throw error
}

export async function fetchADLNote(patientId: string): Promise<ADLNote | null> {
  const { data, error } = await supabase
    .from('adl_notes')
    .select('*')
    .eq('patient_id', patientId)
    .single()

  if (error) return null
  return data
}

export async function saveADLNote(patientId: string, adl: Omit<ADLNote, 'id' | 'patient_id' | 'updated_at'>): Promise<void> {
  const { error } = await supabase
    .from('adl_notes')
    .upsert(
        { patient_id: patientId, ...adl, updated_at: new Date().toISOString() },
        { onConflict: 'patient_id' }
    )

  if (error) throw error
}

export async function fetchTasks(patientId: string): Promise<PendingTask[]> {
  const { data, error } = await supabase
    .from('pending_tasks')
    .select('*')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data ?? []
}

export async function addTask(
  patientId: string,
  task: string,
  priority: PendingTask['priority']
): Promise<void> {
  const { error } = await supabase
    .from('pending_tasks')
    .insert({ patient_id: patientId, task, priority })

  if (error) throw error
}

export async function toggleTask(taskId: string, completed: boolean): Promise<void> {
  const { error } = await supabase
    .from('pending_tasks')
    .update({ completed })
    .eq('id', taskId)

  if (error) throw error
}