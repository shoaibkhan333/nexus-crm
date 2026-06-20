import { motion } from 'framer-motion'
import { useCRM } from '../../context/CRMContext'
import { formatCurrency, stageLabels, stageColors } from '../../data/mockData'

export function TopDeals() {
  const { deals, setView } = useCRM()
  const topDeals = [...deals].sort((a, b) => b.value - a.value).slice(0, 5)

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-800/80">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Top Deals</h3>
          <p className="text-sm text-slate-500">Highest value opportunities</p>
        </div>
        <button
          onClick={() => setView('deals')}
          className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
        >
          View pipeline
        </button>
      </div>
      <div className="space-y-3">
        {topDeals.map((deal, i) => (
          <motion.div
            key={deal.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center gap-3 rounded-xl border border-slate-100 p-3 transition hover:border-brand-200 hover:bg-brand-50/30 dark:border-slate-700 dark:hover:border-brand-700 dark:hover:bg-brand-900/10"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-xs font-bold text-slate-600 dark:bg-slate-700 dark:text-slate-300">
              {i + 1}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-slate-900 dark:text-white">{deal.title}</p>
              <p className="text-xs text-slate-500">{deal.company}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-slate-900 dark:text-white">{formatCurrency(deal.value)}</p>
              <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-medium text-white ${stageColors[deal.stage]}`}>
                {stageLabels[deal.stage]}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
