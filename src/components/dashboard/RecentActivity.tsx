import { motion } from 'framer-motion'
import { Phone, Mail, Calendar, Handshake, FileText } from 'lucide-react'
import { activities } from '../../data/mockData'
import type { Activity } from '../../types'

const iconMap = {
  call: Phone,
  email: Mail,
  meeting: Calendar,
  deal: Handshake,
  note: FileText,
}

const colorMap = {
  call: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
  email: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
  meeting: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  deal: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
  note: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
}

function ActivityItem({ activity, index }: { activity: Activity; index: number }) {
  const Icon = iconMap[activity.type]
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex gap-3 rounded-xl p-3 transition hover:bg-slate-50 dark:hover:bg-slate-700/30"
    >
      <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colorMap[activity.type]}`}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-slate-900 dark:text-white">{activity.title}</p>
          <span className="shrink-0 text-[10px] text-slate-400">{activity.time}</span>
        </div>
        <p className="mt-0.5 truncate text-xs text-slate-500">{activity.description}</p>
        <p className="mt-1 text-[10px] text-slate-400">by {activity.user}</p>
      </div>
    </motion.div>
  )
}

export function RecentActivity() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-800/80">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
          <p className="text-sm text-slate-500">Latest updates across your team</p>
        </div>
        <button className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400">
          View all
        </button>
      </div>
      <div className="space-y-1">
        {activities.map((activity, i) => (
          <ActivityItem key={activity.id} activity={activity} index={i} />
        ))}
      </div>
    </div>
  )
}
