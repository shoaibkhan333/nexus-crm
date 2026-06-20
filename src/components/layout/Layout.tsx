import { motion } from 'framer-motion'
import { useCRM } from '../../context/CRMContext'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { DashboardView } from '../dashboard/DashboardView'
import { ContactsView } from '../contacts/ContactsView'
import { DealsView } from '../deals/DealsView'
import { AnalyticsView } from '../analytics/AnalyticsView'
import { SettingsView } from '../settings/SettingsView'

export function Layout() {
  const { view, sidebarCollapsed } = useCRM()

  const views = {
    dashboard: <DashboardView />,
    contacts: <ContactsView />,
    deals: <DealsView />,
    analytics: <AnalyticsView />,
    settings: <SettingsView />,
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar />
      <div
        className="transition-all duration-300"
        style={{ marginLeft: sidebarCollapsed ? 72 : 260 }}
      >
        <Header />
        <main className="p-6">
          <motion.div
            key={view}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {views[view]}
          </motion.div>
        </main>
      </div>
    </div>
  )
}
