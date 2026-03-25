import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fetchTasks, addTask, toggleTask } from '../services/supabaseService'
import type { PendingTask } from '../types/handoff'

interface Props {
  patientId: string
}

function PendingTasks({ patientId }: Props) {
  const [tasks, setTasks] = useState<PendingTask[]>([])
  const [newTask, setNewTask] = useState('')
  const [priority, setPriority] = useState<PendingTask['priority']>('medium')
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    async function loadTasks() {
      const data = await fetchTasks(patientId)
      setTasks(data)
    }
    void loadTasks()
  }, [patientId])

  async function handleAdd() {
    if (!newTask.trim()) return
    setAdding(true)
    await addTask(patientId, newTask.trim(), priority)
    setNewTask('')
    setPriority('medium')
    const data = await fetchTasks(patientId)
    setTasks(data)
    setAdding(false)
  }

  async function handleToggle(taskId: string, currentStatus: boolean) {
    await toggleTask(taskId, !currentStatus)
    setTasks(prev =>
      prev.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
    )
  }

  const priorityColors: Record<PendingTask['priority'], string> = {
    high: 'var(--color-error)',
    medium: 'var(--color-tertiary)',
    low: 'var(--color-primary)',
  }

  return (
    <section className="space-y-3 mb-6">
      <h3 className="text-sm font-bold tracking-widest uppercase text-on-surface-variant px-2">
        Pending Tasks
      </h3>
      <div className="rounded-xl p-5 space-y-4"
        style={{ backgroundColor: 'var(--color-surface-container-low)' }}>

        {/* Add task form */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="e.g. Repeat CBC at 18:00..."
            onKeyDown={e => e.key === 'Enter' && handleAdd()}
            className="flex-1 rounded-lg text-sm text-on-surface p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value as PendingTask['priority'])}
            className="rounded-lg text-sm font-medium text-on-surface p-2 focus:outline-none focus:ring-2 focus:ring-primary"
            style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
            <option value="high">High</option>
            <option value="medium">Med</option>
            <option value="low">Low</option>
          </select>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            disabled={adding || !newTask.trim()}
            className="rounded-lg px-4 py-2 text-sm font-bold uppercase tracking-wider transition-all"
            style={{
              background: 'linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary-container) 100%)',
              color: 'var(--color-on-primary)',
              opacity: adding || !newTask.trim() ? 0.5 : 1,
            }}>
            {adding ? '...' : 'Add'}
          </motion.button>
        </div>

        {/* Task list */}
        {tasks.length === 0 ? (
          <p className="text-sm text-on-surface-variant text-center py-4">
            No pending tasks — all clear for this patient.
          </p>
        ) : (
          <ul className="space-y-2">
            <AnimatePresence>
              {tasks.map(task => (
                <motion.li
                  key={task.id}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="flex items-center gap-3 rounded-lg p-3"
                  style={{ backgroundColor: 'var(--color-surface-container-lowest)' }}>
                  <motion.div whileTap={{ scale: 0.8 }} className="shrink-0">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => handleToggle(task.id, task.completed)}
                      className="w-4 h-4 rounded accent-primary"
                    />
                  </motion.div>
                  <motion.span
                    animate={{ opacity: task.completed ? 0.5 : 1 }}
                    transition={{ duration: 0.2 }}
                    className={`flex-1 text-sm ${task.completed ? 'line-through' : 'text-on-surface'}`}>
                    {task.task}
                  </motion.span>
                  <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full"
                    style={{
                      color: priorityColors[task.priority],
                      border: `1px solid ${priorityColors[task.priority]}`,
                    }}>
                    {task.priority}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </ul>
        )}
      </div>
    </section>
  )
}

export default PendingTasks
