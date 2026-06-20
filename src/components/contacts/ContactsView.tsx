import { useState, useMemo } from 'react'
import clsx from 'clsx'
import { Plus, Pencil, Trash2, ArrowUpDown, Filter } from 'lucide-react'
import { useCRM } from '../../context/CRMContext'
import { Modal } from '../ui/Modal'
import { formatCurrency } from '../../data/mockData'
import type { Contact, ContactStatus } from '../../types'

type SortKey = 'name' | 'company' | 'value' | 'lastContact'
type SortDir = 'asc' | 'desc'

const statusStyles: Record<ContactStatus, string> = {
  active: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
  inactive: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400',
  lead: 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
}

const emptyContact: Omit<Contact, 'id'> = {
  name: '',
  email: '',
  company: '',
  phone: '',
  status: 'lead',
  avatar: '',
  lastContact: new Date().toISOString().split('T')[0],
  value: 0,
}

export function ContactsView() {
  const { contacts, addContact, updateContact, deleteContact, searchQuery } = useCRM()
  const [modalOpen, setModalOpen] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)
  const [form, setForm] = useState(emptyContact)
  const [statusFilter, setStatusFilter] = useState<ContactStatus | 'all'>('all')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const filtered = useMemo(() => {
    let result = contacts.filter((c) => {
      const q = searchQuery.toLowerCase()
      const matchesSearch =
        !q ||
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q)
      const matchesStatus = statusFilter === 'all' || c.status === statusFilter
      return matchesSearch && matchesStatus
    })
    result.sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      const cmp = typeof av === 'string' ? av.localeCompare(String(bv)) : Number(av) - Number(bv)
      return sortDir === 'asc' ? cmp : -cmp
    })
    return result
  }, [contacts, searchQuery, statusFilter, sortKey, sortDir])

  function openAdd() {
    setEditingContact(null)
    setForm(emptyContact)
    setModalOpen(true)
  }

  function openEdit(contact: Contact) {
    setEditingContact(contact)
    setForm({ ...contact })
    setModalOpen(true)
  }

  async function handleSave() {
    const avatar = form.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
    try {
      if (editingContact) {
        await updateContact(editingContact.id, { ...form, avatar })
      } else {
        await addContact({ ...form, avatar })
      }
      setModalOpen(false)
    } catch {
      alert('Failed to save contact')
    }
  }

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('asc')
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-slate-400" />
          {(['all', 'active', 'lead', 'inactive'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={clsx(
                'rounded-lg px-3 py-1.5 text-xs font-medium capitalize transition',
                statusFilter === s
                  ? 'bg-brand-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-slate-700',
              )}
            >
              {s}
            </button>
          ))}
        </div>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-500/25 transition hover:bg-brand-600"
        >
          <Plus className="h-4 w-4" />
          Add Contact
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm dark:border-slate-700/80 dark:bg-slate-800/80">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700">
                {([
                  ['name', 'Contact'],
                  ['company', 'Company'],
                  ['value', 'Value'],
                  ['lastContact', 'Last Contact'],
                ] as [SortKey, string][]).map(([key, label]) => (
                  <th key={key} className="px-4 py-3 text-left">
                    <button
                      onClick={() => toggleSort(key)}
                      className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                    >
                      {label}
                      <ArrowUpDown className="h-3 w-3" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((contact) => (
                <tr
                  key={contact.id}
                  className="border-b border-slate-100 transition hover:bg-slate-50 dark:border-slate-700/50 dark:hover:bg-slate-700/20"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white">
                        {contact.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900 dark:text-white">{contact.name}</p>
                        <p className="text-xs text-slate-500">{contact.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{contact.company}</td>
                  <td className="px-4 py-3 text-sm font-medium text-slate-900 dark:text-white">{formatCurrency(contact.value)}</td>
                  <td className="px-4 py-3 text-sm text-slate-500">{contact.lastContact}</td>
                  <td className="px-4 py-3">
                    <span className={clsx('rounded-full px-2.5 py-1 text-xs font-medium capitalize', statusStyles[contact.status])}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => openEdit(contact)}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-brand-600 dark:hover:bg-slate-700"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(contact.id)}
                        className="rounded-lg p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-slate-500">
                    No contacts found. Try adjusting your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editingContact ? 'Edit Contact' : 'Add Contact'}>
        <div className="space-y-4">
          {(['name', 'email', 'company', 'phone'] as const).map((field) => (
            <div key={field}>
              <label className="mb-1 block text-xs font-medium capitalize text-slate-500">{field}</label>
              <input
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          ))}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as ContactStatus })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="lead">Lead</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Value ($)</label>
              <input
                type="number"
                value={form.value}
                onChange={(e) => setForm({ ...form, value: Number(e.target.value) })}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button onClick={() => setModalOpen(false)} className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800">
              Cancel
            </button>
            <button onClick={handleSave} className="rounded-xl bg-brand-500 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-600">
              {editingContact ? 'Save Changes' : 'Add Contact'}
            </button>
          </div>
        </div>
      </Modal>

      <Modal open={!!deleteConfirm} onClose={() => setDeleteConfirm(null)} title="Delete Contact" size="sm">
        <p className="text-sm text-slate-600 dark:text-slate-400">Are you sure you want to delete this contact? This action cannot be undone.</p>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={() => setDeleteConfirm(null)} className="rounded-xl px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800">
            Cancel
          </button>
          <button
            onClick={() => {
              if (deleteConfirm) deleteContact(deleteConfirm)
              setDeleteConfirm(null)
            }}
            className="rounded-xl bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </Modal>
    </div>
  )
}
