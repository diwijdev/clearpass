import { useEffect, useState } from 'react'
import { fetchADLNote, saveADLNote } from '../services/supabaseService'
import type { ADLNote } from '../types/handoff'

interface Props {
  patientId: string
}

function ADLNotes({ patientId }: Props) {
  const [adl, setAdl] = useState<Omit<ADLNote, 'id' | 'patient_id' | 'updated_at'>>({
    mobility: 'ambulatory',
    continence: 'independent',
    feeding: 'independent',
    care_instructions: '',
  })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    async function loadADL() {
      const data = await fetchADLNote(patientId)
      if (data) {
        setAdl({
          mobility: data.mobility,
          continence: data.continence,
          feeding: data.feeding,
          care_instructions: data.care_instructions,
        })
      }
    }
    loadADL()
  }, [patientId])

  async function handleSave() {
    setSaving(true)
    await saveADLNote(patientId, adl)
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const selectClass = "w-full rounded-lg text-sm font-medium text-on-surface p-2 focus:outline-none focus:ring-2 focus:ring-primary"

  return (
    <section className="space-y-3 mb-6">
      <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface-variant px-2">
        ADL Care Notes
      </h3>
      <div className="rounded-xl p-5 space-y-4"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}>

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
            className="w-full rounded-lg text-sm text-on-surface p-3 min-h-[80px] focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          disabled={saving}
          className="w-full py-3 rounded-lg text-sm font-bold uppercase tracking-widest transition-all"
          style={{
            background: saved
              ? 'var(--color-tertiary-fixed-dim)'
              : 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
            color: saved ? 'var(--color-on-tertiary-fixed)' : 'var(--color-on-primary)',
            opacity: saving ? 0.6 : 1
          }}>
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save ADL Notes'}
        </button>

      </div>
    </section>
  )
}

export default ADLNotes