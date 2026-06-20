import { useState } from 'react'
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts'
import { sourceData, revenueData } from '../../data/mockData'
import { useCRM } from '../../context/CRMContext'
import { formatCurrency } from '../../data/mockData'

export function AnalyticsView() {
  const { deals, contacts } = useCRM()
  const [activeTab, setActiveTab] = useState<'overview' | 'sources' | 'performance'>('overview')

  const conversionFunnel = [
    { stage: 'Leads', count: contacts.filter((c) => c.status === 'lead').length + 20 },
    { stage: 'Qualified', count: deals.filter((d) => d.stage === 'qualified').length + 15 },
    { stage: 'Proposal', count: deals.filter((d) => d.stage === 'proposal').length + 10 },
    { stage: 'Negotiation', count: deals.filter((d) => d.stage === 'negotiation').length + 5 },
    { stage: 'Closed', count: deals.filter((d) => d.stage === 'closed').length },
  ]

  const avgDealSize = deals.length
    ? Math.round(deals.reduce((s, d) => s + d.value, 0) / deals.length)
    : 0

  const tabs = [
    { id: 'overview' as const, label: 'Overview' },
    { id: 'sources' as const, label: 'Lead Sources' },
    { id: 'performance' as const, label: 'Performance' },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-700/80 dark:bg-slate-800/80">
          <p className="text-sm text-slate-500">Avg Deal Size</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{formatCurrency(avgDealSize)}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-700/80 dark:bg-slate-800/80">
          <p className="text-sm text-slate-500">Total Deals</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">{deals.length}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-slate-700/80 dark:bg-slate-800/80">
          <p className="text-sm text-slate-500">Conversion Rate</p>
          <p className="mt-1 text-2xl font-bold text-slate-900 dark:text-white">
            {Math.round((deals.filter((d) => d.stage === 'closed').length / deals.length) * 100)}%
          </p>
        </div>
      </div>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
              activeTab === tab.id
                ? 'bg-brand-500 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-800/80">
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Conversion Funnel</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={conversionFunnel}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="stage" tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Bar dataKey="count" fill="#6366f1" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-800/80">
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Deal Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData.slice(-6)}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                />
                <Line type="monotone" dataKey="deals" stroke="#8b5cf6" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {activeTab === 'sources' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-800/80">
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Lead Sources</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={110}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sourceData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  formatter={(value) => [`${value}%`, 'Share']}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-800/80">
            <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Source Breakdown</h3>
            <div className="space-y-4">
              {sourceData.map((source) => (
                <div key={source.name}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="font-medium text-slate-700 dark:text-slate-300">{source.name}</span>
                    <span className="text-slate-500">{source.value}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${source.value}%`, backgroundColor: source.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-800/80">
          <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-white">Revenue Performance</h3>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}K`} />
              <Tooltip
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                formatter={(value) => [`$${Number(value).toLocaleString()}`, '']}
              />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} name="Revenue" />
              <Bar dataKey="target" fill="#10b981" radius={[6, 6, 0, 0]} name="Target" opacity={0.6} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}
