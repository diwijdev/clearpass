import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchADLNote, saveADLNote } from '../services/supabaseService'
import type { ADLNote } from '../types/handoff'

interface Props {
  patientId: string
}

type ADLFields = Omit<ADLNote, 'id' | 'patient_id' | 'updated_at'>

const badgeColor: Record<string, { color: string; border: string }> = {
  ambulatory:  { color: 'var(--color-primary)',  border: 'var(--color-primary)' },
  wheelchair:  { color: 'var(--color-tertiary)', border: 'var(--color-tertiary)' },
  bedridden:   { color: 'var(--color-error)',    border: 'var(--color-error)' },
  independent: { color: 'var(--color-primary)',  border: 'var(--color-primary)' },
  assisted:    { color: 'var(--color-tertiary)', border: 'var(--color-tertiary)' },
  catheter:    { color: 'var(--color-error)',    border: 'var(--color-error)' },
  NGT:         { color: 'var(--color-error)',    border: 'var(--color-error)' },
}

function ADLNotes({ patientId }: Props) {
  const defaults: ADLFields = {
    mobility: 'ambulatory',
    continence: 'independent',
    feeding: 'independent',
    care_instructions: '',
  }

  const [adl, setAdl] = useState<ADLFields>(defaults)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [editing, setEditing] = useState(true)
  const [loaded, setLoaded] = useState(false)
  const savedSnapshot = useRef<ADLFields>(defaults)

  useEffect(() => {
    async function loadADL() {
      const data = await fetchADLNote(patientId)
      if (data) {
        const fields: ADLFields = {
          mobility: data.mobility,
          continence: data.continence,
          feeding: data.feeding,
          care_instructions: data.care_instructions,
        }
        setAdl(fields)
        savedSnapshot.current = fields
        setEditing(false)
      }
      setLoaded(true)
    }
    loadADL()
  }, [patientId])

  async function handleSave() {
    setSaving(true)
    await saveADLNote(patientId, adl)
    setSaving(false)
    setSaved(true)
    savedSnapshot.current = { ...adl }
    setTimeout(() => {
      setSaved(false)
      setEditing(false)
    }, 1200)
  }

  function handleCancel() {
    setAdl({ ...savedSnapshot.current })
    setEditing(false)
  }

  const selectClass = "w-full rounded-lg text-sm font-medium text-on-surface p-2 focus:outline-none focus:ring-2 focus:ring-primary"

  if (!loaded) return null

  return (
    <section className="space-y-3 mb-6">
      <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface-variant px-2">
        ADL Care Notes
      </h3>
      <div className="rounded-xl p-5 space-y-4"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}>

        <AnimatePresence mode="wait">
          {editing ? (
            <motion.div
              key="edit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* ADL grid */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <p className="text-[9px] font-bold uppercase text-on-surface-variant mb-2">Mobility</p>
                  <select
                    value={adl.mobility}
                    onChange={e => setAdl({ ...adl, mobility: e.target.value as ADLNote['mobility'] })}
                    className={selectClass}
                    style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
                    <option value="ambulatory">Ambulatory</option>
                    <option value="wheelchair">Wheelchair</option>
                    <option value="bedridden">Bedridden</option>
                  </select>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase text-on-surface-variant mb-2">Continence</p>
                  <select
                    value={adl.continence}
                    onChange={e => setAdl({ ...adl, continence: e.target.value as ADLNote['continence'] })}
                    className={selectClass}
                    style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
                    <option value="independent">Independent</option>
                    <option value="assisted">Assisted</option>
                    <option value="catheter">Catheter</option>
                  </select>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase text-on-surface-variant mb-2">Feeding</p>
                  <select
                    value={adl.feeding}
                    onChange={e => setAdl({ ...adl, feeding: e.target.value as ADLNote['feeding'] })}
                    className={selectClass}
                    style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
                    <option value="independent">Independent</option>
                    <option value="assisted">Assisted</option>
                    <option value="NGT">NGT</option>
                  </select>
                </div>
              </div>

              {/* Care instructions */}
              <div>
                <p className="text-[9px] font-bold uppercase text-on-surface-variant mb-2">Care Instructions</p>
                <textarea
                  value={adl.care_instructions}
                  onChange={e => setAdl({ ...adl, care_instructions: e.target.value })}
                  placeholder="e.g. High fall risk, needs assistance during transfers..."
                  className="w-full rounded-lg text-sm text-on-surface p-3 min-h-20 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-3">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  animate={saved ? { scale: [1, 1.04, 1] } : { scale: 1 }}
                  transition={{ duration: 0.3 }}
                  onClick={handleSave}
                  disabled={saving}
                  className="flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all"
                  style={{
                    background: saved
                      ? 'var(--color-tertiary-fixed-dim)'
                      : 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
                    color: saved ? 'var(--color-on-tertiary-fixed)' : 'var(--color-on-primary)',
                    opacity: saving ? 0.6 : 1
                  }}>
                  {saving ? 'Saving...' : saved ? 'Saved!' : 'Save ADL Notes'}
                </motion.button>
                {/* Only show cancel if there's saved data to go back to */}
                {savedSnapshot.current !== defaults && (
                  <button
                    onClick={handleCancel}
                    className="px-4 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-colors"
                    style={{
                      border: '1px solid var(--color-outline-variant)',
                      color: 'var(--color-on-surface-variant)',
                    }}>
                    Cancel
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="read"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="space-y-4"
            >
              {/* ADL badges */}
              <div className="grid grid-cols-3 gap-3">
                {([
                  ['Mobility', adl.mobility],
                  ['Continence', adl.continence],
                  ['Feeding', adl.feeding],
                ] as const).map(([label, value]) => {
                  const colors = badgeColor[value] ?? { color: 'var(--color-on-surface-variant)', border: 'var(--color-outline-variant)' }
                  return (
                    <div key={label}>
                      <p className="text-[9px] font-bold uppercase text-on-surface-variant mb-2">{label}</p>
                      <span
                        className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full"
                        style={{
                          color: colors.color,
                          border: `1px solid ${colors.border}`,
                        }}>
                        {value}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* Care instructions display */}
              <div>
                <p className="text-[9px] font-bold uppercase text-on-surface-variant mb-2">Care Instructions</p>
                <div
                  className="rounded-lg p-3 text-sm"
                  style={{
                    backgroundColor: 'var(--color-surface-container-lowest)',
                    borderLeft: '3px solid var(--color-primary)',
                  }}>
                  {adl.care_instructions ? (
                    <p className="text-on-surface" style={{ whiteSpace: 'pre-wrap' }}>
                      {adl.care_instructions}
                    </p>
                  ) : (
                    <p className="text-on-surface-variant italic">No care instructions recorded.</p>
                  )}
                </div>
              </div>

              {/* Edit button */}
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
                style={{
                  border: '1px solid var(--color-outline-variant)',
                  color: 'var(--color-on-surface-variant)',
                }}>
                <span className="material-symbols-outlined text-sm">edit</span>
                Edit
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default ADLNotes
