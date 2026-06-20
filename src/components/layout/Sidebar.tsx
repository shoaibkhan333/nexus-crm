import clsx from 'clsx'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  Users,
  Handshake,
  BarChart3,
  Settings,
  ChevronLeft,
  Zap,
} from 'lucide-react'
import { useCRM } from '../../context/CRMContext'
import type { View } from '../../types'

const navItems: { id: View; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'contacts', label: 'Contacts', icon: Users },
  { id: 'deals', label: 'Deals', icon: Handshake },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const { view, setView, sidebarCollapsed, toggleSidebar, contacts, deals } = useCRM()

  return (
    <motion.aside
      animate={{ width: sidebarCollapsed ? 72 : 260 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200/80 bg-white dark:border-slate-700/80 dark:bg-slate-900"
    >
      <div className="flex h-16 items-center gap-3 border-b border-slate-200/80 px-4 dark:border-slate-700/80">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/25">
          <Zap className="h-5 w-5 text-white" />
        </div>
        {!sidebarCollapsed && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="overflow-hidden">
            <h1 className="text-lg font-bold text-slate-900 dark:text-white">NexusCRM</h1>
            <p className="text-xs text-slate-500">Sales Platform</p>
          </motion.div>
        )}
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const active = view === item.id
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={clsx(
                'group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                active
                  ? 'bg-brand-50 text-brand-600 shadow-sm dark:bg-brand-900/30 dark:text-brand-400'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white',
              )}
            >
              <Icon className={clsx('h-5 w-5 shrink-0', active && 'text-brand-600 dark:text-brand-400')} />
              {!sidebarCollapsed && (
                <span className="truncate">{item.label}</span>
              )}
              {!sidebarCollapsed && item.id === 'contacts' && (
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  {contacts.length}
                </span>
              )}
              {!sidebarCollapsed && item.id === 'deals' && (
                <span className="ml-auto rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500 dark:bg-slate-700 dark:text-slate-400">
                  {deals.length}
                </span>
              )}
            </button>
          )
        })}
      </nav>

      {!sidebarCollapsed && (
        <div className="mx-3 mb-3 rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 p-4 text-white">
          <p className="text-sm font-semibold">Upgrade to Pro</p>
          <p className="mt-1 text-xs text-white/80">Unlock advanced analytics & AI insights</p>
          <button className="mt-3 w-full rounded-lg bg-white/20 py-1.5 text-xs font-semibold backdrop-blur transition hover:bg-white/30">
            Learn More
          </button>
        </div>
      )}

      <button
        onClick={toggleSidebar}
        className="flex h-12 items-center justify-center border-t border-slate-200/80 text-slate-400 transition hover:bg-slate-50 hover:text-slate-600 dark:border-slate-700/80 dark:hover:bg-slate-800 dark:hover:text-slate-200"
      >
        <ChevronLeft className={clsx('h-5 w-5 transition-transform', sidebarCollapsed && 'rotate-180')} />
      </button>
    </motion.aside>
  )
}
