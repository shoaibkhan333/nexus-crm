import { useState } from 'react'
import { DollarSign, Users, Handshake, TrendingUp } from 'lucide-react'
import { StatCard } from '../ui/StatCard'
import { RevenueChart } from './RevenueChart'
import { PipelineChart } from './PipelineChart'
import { RecentActivity } from './RecentActivity'
import { TopDeals } from './TopDeals'
import { useCRM } from '../../context/CRMContext'
import { formatCurrency } from '../../data/mockData'

export function DashboardView() {
  const { contacts, deals, setView } = useCRM()
  const [chartRange, setChartRange] = useState<'6m' | '12m'>('12m')

  const totalRevenue = deals.filter((d) => d.stage === 'closed').reduce((s, d) => s + d.value, 0)
  const pipelineValue = deals.filter((d) => d.stage !== 'closed').reduce((s, d) => s + d.value, 0)
  const winRate = Math.round((deals.filter((d) => d.stage === 'closed').length / deals.length) * 100)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(totalRevenue)}
          change={12.5}
          icon={DollarSign}
          color="bg-gradient-to-br from-emerald-500 to-emerald-600"
          onClick={() => setView('analytics')}
        />
        <StatCard
          title="Active Contacts"
          value={String(contacts.filter((c) => c.status === 'active').length)}
          change={8.2}
          icon={Users}
          color="bg-gradient-to-br from-blue-500 to-blue-600"
          onClick={() => setView('contacts')}
        />
        <StatCard
          title="Pipeline Value"
          value={formatCurrency(pipelineValue)}
          change={15.3}
          icon={Handshake}
          color="bg-gradient-to-br from-violet-500 to-violet-600"
          onClick={() => setView('deals')}
        />
        <StatCard
          title="Win Rate"
          value={`${winRate}%`}
          change={3.1}
          icon={TrendingUp}
          color="bg-gradient-to-br from-amber-500 to-amber-600"
          onClick={() => setView('analytics')}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-800/80">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-slate-900 dark:text-white">Revenue Overview</h3>
                <p className="text-sm text-slate-500">Monthly revenue vs target</p>
              </div>
              <div className="flex rounded-lg border border-slate-200 p-0.5 dark:border-slate-700">
                {(['6m', '12m'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setChartRange(range)}
                    className={`rounded-md px-3 py-1 text-xs font-medium transition ${
                      chartRange === range
                        ? 'bg-brand-500 text-white'
                        : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
                    }`}
                  >
                    {range === '6m' ? '6 Months' : '12 Months'}
                  </button>
                ))}
              </div>
            </div>
            <RevenueChart range={chartRange} />
          </div>
        </div>
        <PipelineChart />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RecentActivity />
        <TopDeals />
      </div>
    </div>
  )
}
