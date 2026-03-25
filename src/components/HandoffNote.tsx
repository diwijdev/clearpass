import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchHandoffNotes, saveHandoffNote } from '../services/supabaseService'
import type { HandoffNote } from '../types/handoff'

interface Props {
  patientId: string
}

function HandoffNoteSection({ patientId }: Props) {
  const [notes, setNotes] = useState<HandoffNote[]>([])
  const [newNote, setNewNote] = useState('')
  const clinicianName = 'Dr. Sarah Chen'
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    async function loadNotes() {
      const data = await fetchHandoffNotes(patientId)
      setNotes(data)
    }
    loadNotes()
  }, [patientId])

  async function handleSave() {
    if (!newNote.trim()) return
    setSaving(true)
    await saveHandoffNote(patientId, newNote, clinicianName)
    const updated = await fetchHandoffNotes(patientId)
    setNotes(updated)
    setNewNote('')
    setSaving(false)
  }

  return (
    <section className="space-y-3 mb-6">
      <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface-variant px-2">
        Clinical Handoff
      </h3>

      {/* Previous notes */}
      {notes.length > 0 && (
        <div className="space-y-3">
          <AnimatePresence>
            {notes.map((note, index) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, delay: index * 0.06, ease: 'easeOut' }}
                className="rounded-xl overflow-hidden shadow-sm"
                style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
                <div className="p-4 flex justify-between items-center"
                  style={{ backgroundColor: 'var(--color-primary-container)' }}>
                  <div>
                    <p className="text-xs font-bold text-on-primary-container">{note.clinician_name}</p>
                    <p className="text-[10px] text-on-primary-container opacity-70">
                      {new Date(note.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-on-primary-container opacity-50">
                    history_edu
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium text-on-surface leading-relaxed">{note.note}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* New note */}
      <div className="rounded-xl overflow-hidden shadow-sm"
        style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
        <div className="p-4">
          <textarea
            value={newNote}
            onChange={e => setNewNote(e.target.value)}
            placeholder="Add handoff note..."
            className="w-full rounded-lg text-sm font-medium text-on-surface focus:outline-none focus:ring-2 focus:ring-primary min-h-[100px] p-3 leading-relaxed resize-none"
            style={{ backgroundColor: 'var(--color-surface-container-low)' }}
          />
          <div className="mt-4 flex gap-3">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-opacity"
              style={{
                background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
                color: 'var(--color-on-primary)',
                opacity: saving ? 0.6 : 1
              }}>
              {saving ? 'Saving...' : 'Save Note'}
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HandoffNoteSection
