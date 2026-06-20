import type { Activity, Contact, Deal, Notification } from '../types'

export const revenueData = [
  { month: 'Jan', revenue: 42000, target: 40000, deals: 12 },
  { month: 'Feb', revenue: 38500, target: 42000, deals: 10 },
  { month: 'Mar', revenue: 51200, target: 45000, deals: 15 },
  { month: 'Apr', revenue: 47800, target: 48000, deals: 13 },
  { month: 'May', revenue: 58900, target: 50000, deals: 18 },
  { month: 'Jun', revenue: 62400, target: 55000, deals: 20 },
  { month: 'Jul', revenue: 55800, target: 58000, deals: 16 },
  { month: 'Aug', revenue: 67200, target: 60000, deals: 22 },
  { month: 'Sep', revenue: 71500, target: 62000, deals: 24 },
  { month: 'Oct', revenue: 68900, target: 65000, deals: 21 },
  { month: 'Nov', revenue: 74200, target: 68000, deals: 25 },
  { month: 'Dec', revenue: 79800, target: 70000, deals: 28 },
]

export const pipelineData = [
  { stage: 'Lead', count: 45, value: 180000 },
  { stage: 'Qualified', count: 32, value: 256000 },
  { stage: 'Proposal', count: 18, value: 324000 },
  { stage: 'Negotiation', count: 12, value: 480000 },
  { stage: 'Closed', count: 8, value: 640000 },
]

export const sourceData = [
  { name: 'Website', value: 35, color: '#6366f1' },
  { name: 'Referral', value: 28, color: '#8b5cf6' },
  { name: 'LinkedIn', value: 22, color: '#06b6d4' },
  { name: 'Events', value: 10, color: '#10b981' },
  { name: 'Other', value: 5, color: '#f59e0b' },
]

export const initialContacts: Contact[] = [
  { id: '1', name: 'Sarah Chen', email: 'sarah.chen@techflow.io', company: 'TechFlow Inc', phone: '+1 (555) 234-5678', status: 'active', avatar: 'SC', lastContact: '2026-06-18', value: 45000 },
  { id: '2', name: 'Marcus Johnson', email: 'marcus.j@globalcorp.com', company: 'GlobalCorp', phone: '+1 (555) 345-6789', status: 'active', avatar: 'MJ', lastContact: '2026-06-17', value: 78000 },
  { id: '3', name: 'Emily Rodriguez', email: 'emily.r@startupxyz.com', company: 'StartupXYZ', phone: '+1 (555) 456-7890', status: 'lead', avatar: 'ER', lastContact: '2026-06-15', value: 22000 },
  { id: '4', name: 'David Kim', email: 'david.kim@innovate.co', company: 'Innovate Co', phone: '+1 (555) 567-8901', status: 'active', avatar: 'DK', lastContact: '2026-06-16', value: 56000 },
  { id: '5', name: 'Lisa Thompson', email: 'lisa.t@enterprise.com', company: 'Enterprise Ltd', phone: '+1 (555) 678-9012', status: 'inactive', avatar: 'LT', lastContact: '2026-05-28', value: 34000 },
  { id: '6', name: 'James Wilson', email: 'james.w@cloudbase.io', company: 'CloudBase', phone: '+1 (555) 789-0123', status: 'active', avatar: 'JW', lastContact: '2026-06-18', value: 92000 },
  { id: '7', name: 'Anna Petrov', email: 'anna.p@datastream.com', company: 'DataStream', phone: '+1 (555) 890-1234', status: 'lead', avatar: 'AP', lastContact: '2026-06-14', value: 18000 },
  { id: '8', name: 'Michael Brown', email: 'michael.b@nexgen.ai', company: 'NexGen AI', phone: '+1 (555) 901-2345', status: 'active', avatar: 'MB', lastContact: '2026-06-17', value: 125000 },
]

export const initialDeals: Deal[] = [
  { id: 'd1', title: 'Enterprise License', company: 'TechFlow Inc', value: 45000, stage: 'negotiation', contactId: '1', probability: 75, closeDate: '2026-07-15', owner: 'Alex Morgan' },
  { id: 'd2', title: 'Annual Support Plan', company: 'GlobalCorp', value: 78000, stage: 'proposal', contactId: '2', probability: 60, closeDate: '2026-07-30', owner: 'Alex Morgan' },
  { id: 'd3', title: 'Starter Package', company: 'StartupXYZ', value: 22000, stage: 'lead', contactId: '3', probability: 20, closeDate: '2026-08-15', owner: 'Jamie Lee' },
  { id: 'd4', title: 'Platform Migration', company: 'Innovate Co', value: 56000, stage: 'qualified', contactId: '4', probability: 45, closeDate: '2026-08-01', owner: 'Alex Morgan' },
  { id: 'd5', title: 'Cloud Infrastructure', company: 'CloudBase', value: 92000, stage: 'closed', contactId: '6', probability: 100, closeDate: '2026-06-10', owner: 'Jamie Lee' },
  { id: 'd6', title: 'AI Integration Suite', company: 'NexGen AI', value: 125000, stage: 'negotiation', contactId: '8', probability: 80, closeDate: '2026-07-01', owner: 'Alex Morgan' },
  { id: 'd7', title: 'Data Analytics Module', company: 'DataStream', value: 18000, stage: 'lead', contactId: '7', probability: 15, closeDate: '2026-09-01', owner: 'Jamie Lee' },
  { id: 'd8', title: 'Consulting Retainer', company: 'Enterprise Ltd', value: 34000, stage: 'qualified', contactId: '5', probability: 40, closeDate: '2026-08-20', owner: 'Jamie Lee' },
]

export const activities: Activity[] = [
  { id: 'a1', type: 'deal', title: 'Deal closed', description: 'Cloud Infrastructure deal with CloudBase — $92,000', time: '2 hours ago', user: 'Jamie Lee' },
  { id: 'a2', type: 'call', title: 'Discovery call', description: '30-min call with Sarah Chen about Enterprise License', time: '4 hours ago', user: 'Alex Morgan' },
  { id: 'a3', type: 'email', title: 'Proposal sent', description: 'Annual Support Plan proposal sent to GlobalCorp', time: '5 hours ago', user: 'Alex Morgan' },
  { id: 'a4', type: 'meeting', title: 'Demo scheduled', description: 'Product demo with NexGen AI team on July 1', time: 'Yesterday', user: 'Alex Morgan' },
  { id: 'a5', type: 'note', title: 'Follow-up note', description: 'Emily Rodriguez interested in Q3 implementation', time: 'Yesterday', user: 'Jamie Lee' },
  { id: 'a6', type: 'call', title: 'Check-in call', description: 'Quarterly review with David Kim at Innovate Co', time: '2 days ago', user: 'Alex Morgan' },
]

export const notifications: Notification[] = [
  { id: 'n1', title: 'Deal won!', message: 'Cloud Infrastructure deal closed for $92,000', time: '2h ago', read: false },
  { id: 'n2', title: 'Meeting reminder', message: 'Demo with NexGen AI in 1 hour', time: '3h ago', read: false },
  { id: 'n3', title: 'New lead assigned', message: 'Emily Rodriguez from StartupXYZ assigned to you', time: '5h ago', read: true },
  { id: 'n4', title: 'Task overdue', message: 'Follow up with Lisa Thompson — due yesterday', time: '1d ago', read: true },
]

export const stageLabels: Record<string, string> = {
  lead: 'Lead',
  qualified: 'Qualified',
  proposal: 'Proposal',
  negotiation: 'Negotiation',
  closed: 'Closed Won',
}

export const stageColors: Record<string, string> = {
  lead: 'bg-slate-500',
  qualified: 'bg-blue-500',
  proposal: 'bg-violet-500',
  negotiation: 'bg-amber-500',
  closed: 'bg-emerald-500',
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value)
}

export function formatCompact(value: number): string {
  if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`
  if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`
  return `$${value}`
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .filter(Boolean)
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

export function getFirstName(name: string): string {
  return name.split(' ')[0] || name
}

export const defaultUserProfile = {
  name: 'Alex Morgan',
  email: 'alex.morgan@nexuscrm.io',
  role: 'Sales Manager',
}

export const DEMO_ACCOUNT = {
  email: 'demo@nexuscrm.io',
  password: 'Demo@123456',
  name: 'Demo User',
  role: 'Sales Manager',
}
