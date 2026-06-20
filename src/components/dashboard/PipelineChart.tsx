import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { pipelineData } from '../../data/mockData'
import { formatCompact } from '../../data/mockData'

const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd', '#10b981']

export function PipelineChart() {
  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm dark:border-slate-700/80 dark:bg-slate-800/80">
      <div className="mb-6">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Sales Pipeline</h3>
        <p className="text-sm text-slate-500">Deals by stage</p>
      </div>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={pipelineData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
          <XAxis type="number" hide />
          <YAxis
            type="category"
            dataKey="stage"
            tick={{ fontSize: 12, fill: '#94a3b8' }}
            axisLine={false}
            tickLine={false}
            width={90}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1e293b',
              border: 'none',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '13px',
            }}
            formatter={(value, name) => {
              if (name === 'count') return [value, 'Deals']
              return [formatCompact(Number(value)), 'Value']
            }}
          />
          <Bar dataKey="count" radius={[0, 8, 8, 0]} barSize={24}>
            {pipelineData.map((_, i) => (
              <Cell key={i} fill={colors[i]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-3">
        {pipelineData.map((stage, i) => (
          <div key={stage.stage} className="flex items-center gap-2 text-xs">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-slate-500">{stage.stage}</span>
            <span className="ml-auto font-semibold text-slate-700 dark:text-slate-300">
              {formatCompact(stage.value)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
