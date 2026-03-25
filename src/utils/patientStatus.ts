import type { Condition } from '../types/fhir'

export type PatientStatus = 'critical' | 'monitor' | 'stable'

export function deriveStatus(conditions: Condition[]): PatientStatus {
  if (conditions.length >= 3) return 'critical'
  if (conditions.length >= 1) return 'monitor'
  return 'stable'
}

export const statusConfig: Record<PatientStatus, { label: string; bg: string; text: string; border: string }> = {
  critical: {
    label: 'Critical',
    bg: 'var(--color-error)',
    text: 'var(--color-on-error)',
    border: 'var(--color-error)',
  },
  monitor: {
    label: 'Monitor',
    bg: 'var(--color-tertiary-fixed-dim)',
    text: 'var(--color-on-tertiary-fixed)',
    border: 'var(--color-tertiary-fixed-dim)',
  },
  stable: {
    label: 'Stable',
    bg: 'var(--color-primary-container)',
    text: 'var(--color-on-primary-container)',
    border: 'var(--color-primary)',
  },
}