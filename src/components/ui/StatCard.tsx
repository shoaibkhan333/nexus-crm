import clsx from 'clsx'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  change: number
  icon: LucideIcon
  color: string
  onClick?: () => void
}

export function StatCard({ title, value, change, icon: Icon, color, onClick }: StatCardProps) {
  const isPositive = change >= 0

  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={clsx(
        'cursor-pointer rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-shadow hover:shadow-lg dark:border-slate-700/80 dark:bg-slate-800/80',
        onClick && 'cursor-pointer',
      )}
    >
      <div className="flex items-start justify-between">
        <div className={clsx('rounded-xl p-3', color)}>
          <Icon className="h-5 w-5 text-white" />
        </div>
        <span
          className={clsx(
            'rounded-full px-2.5 py-1 text-xs font-semibold',
            isPositive
              ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
              : 'bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400',
          )}
        >
          {isPositive ? '+' : ''}
          {change}%
        </span>
      </div>
      <div className="mt-4">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{title}</p>
        <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{value}</p>
      </div>
    </motion.div>
  )
}
