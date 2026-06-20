export type View = 'dashboard' | 'contacts' | 'deals' | 'analytics' | 'settings'

export type DealStage = 'lead' | 'qualified' | 'proposal' | 'negotiation' | 'closed'

export type ContactStatus = 'active' | 'inactive' | 'lead'

export interface Contact {
  id: string
  name: string
  email: string
  company: string
  phone: string
  status: ContactStatus
  avatar: string
  lastContact: string
  value: number
}

export interface Deal {
  id: string
  title: string
  company: string
  value: number
  stage: DealStage
  contactId: string
  probability: number
  closeDate: string
  owner: string
}

export interface Activity {
  id: string
  type: 'call' | 'email' | 'meeting' | 'deal' | 'note'
  title: string
  description: string
  time: string
  user: string
}

export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
}

export interface UserProfile {
  name: string
  email: string
  role: string
}
