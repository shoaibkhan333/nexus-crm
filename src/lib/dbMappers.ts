import type { Contact, Deal } from '../types'

export function contactToRow(c: Omit<Contact, 'id'>, userId: string) {
  return {
    user_id: userId,
    name: c.name,
    email: c.email,
    company: c.company,
    phone: c.phone,
    status: c.status,
    avatar: c.avatar,
    last_contact: c.lastContact,
    value: c.value,
  }
}

export function rowToContact(r: Record<string, unknown>): Contact {
  return {
    id: r.id as string,
    name: r.name as string,
    email: (r.email as string) || '',
    company: (r.company as string) || '',
    phone: (r.phone as string) || '',
    status: r.status as Contact['status'],
    avatar: (r.avatar as string) || '',
    lastContact: (r.last_contact as string) || '',
    value: Number(r.value) || 0,
  }
}

export function dealToRow(d: Omit<Deal, 'id'>, userId: string) {
  return {
    user_id: userId,
    title: d.title,
    company: d.company,
    value: d.value,
    stage: d.stage,
    contact_id: d.contactId,
    probability: d.probability,
    close_date: d.closeDate || null,
    owner: d.owner,
  }
}

export function rowToDeal(r: Record<string, unknown>): Deal {
  return {
    id: r.id as string,
    title: r.title as string,
    company: (r.company as string) || '',
    value: Number(r.value) || 0,
    stage: r.stage as Deal['stage'],
    contactId: (r.contact_id as string) || '',
    probability: Number(r.probability) || 0,
    closeDate: (r.close_date as string) || '',
    owner: (r.owner as string) || '',
  }
}
