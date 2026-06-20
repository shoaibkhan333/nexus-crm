import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { motion } from 'framer-motion'
import { Plus, GripVertical } from 'lucide-react'
import { useCRM } from '../../context/CRMContext'
import { Modal } from '../ui/Modal'
import { formatCurrency, stageLabels, stageColors } from '../../data/mockData'
import type { Deal, DealStage } from '../../types'

const stages: DealStage[] = ['lead', 'qualified', 'proposal', 'negotiation', 'closed']

const emptyDeal: Omit<Deal, 'id'> = {
  title: '',
  company: '',
  value: 0,
  stage: 'lead',
  contactId: '',
  probability: 20,
  closeDate: '',
  owner: 'Alex Morgan',
}

export function DealsView() {
  const { deals, moveDeal, addDeal, searchQuery, userProfile } = useCRM()
  const [draggedDeal, setDraggedDeal] = useState<string | null>(null)
  const [dragOverStage, setDragOverStage] = useState<DealStage | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [form, setForm] = useState<Omit<Deal, 'id'>>({ ...emptyDeal, owner: userProfile.name })

  const filteredDeals = useMemo(() => {
    if (!searchQuery) return deals
    const q = searchQuery.toLowerCase()
    return deals.filter(
      (d) => d.title.toLowerCase().includes(q) || d.company.toLowerCase().includes(q),
    )
  }, [deals, searchQuery])

  const dealsByStage = stages.reduce(
    (acc, stage) => {
      acc[stage] = filteredDeals.filter((d) => d.stage === stage)
      return acc
    },
    {} as Record<DealStage, Deal[]>,
  )

  function handleDragStart(dealId: string) {
    setDraggedDeal(dealId)
  }

  async function handleDrop(stage: DealStage) {
    if (draggedDeal) {
      await moveDeal(draggedDeal, stage)
      setDraggedDeal(null)
      setDragOverStage(null)
    }
  }

  async function handleAddDeal() {
    try {
      await addDeal(form)
      setForm({ ...emptyDeal, owner: userProfile.name })
      setModalOpen(false)
    } catch {
      alert('Failed to create deal')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">
          Drag and drop deals between stages to update pipeline
        </p>
        <button
          onClick={() => {
            setForm({ ...emptyDeal, owner: userProfile.name })
            setModalOpen(true)
          }}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" />
          New Deal
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {stages.map((stage) => (
          <div
            key={stage}
            onDragOver={(e) => {
              e.preventDefault()
              setDragOverStage(stage)
            }}
            onDragLeave={() => setDragOverStage(null)}
            onDrop={() => handleDrop(stage)}
            className={clsx(
              'min-w-[280px] flex-1 rounded-2xl border-2 border-dashed p-4 transition',
              dragOverStage === stage
                ? 'border-brand-400 bg-brand-50/50 dark:border-brand-500 dark:bg-brand-900/20'
                : 'border-transparent bg-slate-100/50 dark:bg-slate-800/50',
            )}
          >
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className={clsx('h-2.5 w-2.5 rounded-full', stageColors[stage])} />
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{stageLabels[stage]}</h3>
              </div>
              <span className="rounded-full bg-white px-2 py-0.5 text-xs font-medium text-slate-500 shadow-sm dark:bg-slate-700 dark:text-slate-400">
                {dealsByStage[stage].length}
              </span>
            </div>

            <div className="space-y-3">
              {dealsByStage[stage].map((deal) => (
                <motion.div
                  key={deal.id}
                  layout
                  draggable
                  onDragStart={() => handleDragStart(deal.id)}
                  onDragEnd={() => {
                    setDraggedDeal(null)
                    setDragOverStage(null)
                  }}
                  whileHover={{ scale: 1.02 }}
                  className={clsx(
                    'cursor-grab rounded-xl border border-slate-200 bg-white p-4 shadow-sm transition active:cursor-grabbing dark:border-slate-700 dark:bg-slate-800',
                    draggedDeal === deal.id && 'opacity-50',
                  )}
                >
                  <div className="mb-2 flex items-start justify-between">
                    <GripVertical className="h-4 w-4 shrink-0 text-slate-300" />
                    <span className="text-[10px] text-slate-400">{deal.probability}%</span>
                  </div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{deal.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">{deal.company}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm font-bold text-brand-600 dark:text-brand-400">
                      {formatCurrency(deal.value)}
                    </span>
                    <span className="text-[10px] text-slate-400">{deal.closeDate}</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div
                      className={clsx('h-full rounded-full transition-all', stageColors[stage])}
                      style={{ width: `${deal.probability}%` }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Create New Deal">
        <div className="space-y-4">
          {(['title', 'company', 'owner', 'closeDate'] as const).map((field) => (
            <div key={field}>
              <label className="mb-1 block text-xs font-medium capitalize text-slate-500">
                {field === 'closeDate' ? 'Close Date' : field}
              </label>
              <input
                type={field === 'closeDate' ? 'date' : 'text'}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Value ($)</label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Stage</label>
              <select
                value={form.stage}
                onChange={(e) => setForm({ ...form, stage: e.target.value as DealStage })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                {stages.map((s) => (
                  <option key={s} value={s}>{stageLabels[s]}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
              Cancel
            </button>
            <button onClick={handleAddDeal} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
              Create Deal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
