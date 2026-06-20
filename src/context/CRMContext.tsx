import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import type { Contact, Deal, Notification, UserProfile, View } from '../types'
import { initialContacts, initialDeals, notifications as initialNotifications, defaultUserProfile, DEMO_ACCOUNT } from '../data/mockData'
import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { contactToRow, rowToContact, dealToRow, rowToDeal } from '../lib/dbMappers'

interface CRMContextValue {
  view: View
  setView: (view: View) => void
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  darkMode: boolean
  toggleDarkMode: () => void
  userProfile: UserProfile
  updateUserProfile: (profile: Partial<UserProfile>) => void
  contacts: Contact[]
  addContact: (contact: Omit<Contact, 'id'>) => Promise<void>
  updateContact: (id: string, contact: Partial<Contact>) => Promise<void>
  deleteContact: (id: string) => Promise<void>
  deals: Deal[]
  moveDeal: (dealId: string, newStage: Deal['stage']) => Promise<void>
  addDeal: (deal: Omit<Deal, 'id'>) => Promise<void>
  notifications: Notification[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  unreadCount: number
  searchQuery: string
  setSearchQuery: (query: string) => void
  authUser: User | null
  authLoading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
  usingDatabase: boolean
  demoMode: boolean
  enterDemoMode: () => void
}

const CRMContext = createContext<CRMContextValue | null>(null)

async function seedUserData(userId: string) {
  if (!supabase) return
  const contactRows = initialContacts.map((c) => contactToRow(c, userId))
  const { data: insertedContacts } = await supabase.from('contacts').insert(contactRows).select()
  const contactIdMap = new Map(initialContacts.map((c, i) => [c.id, insertedContacts?.[i]?.id as string]))
  const dealRows = initialDeals.map((d) =>
    dealToRow({ ...d, contactId: contactIdMap.get(d.contactId) || '' }, userId),
  )
  await supabase.from('deals').insert(dealRows)
}

export function CRMProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('crm-dark-mode') === 'true')
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [searchQuery, setSearchQuery] = useState('')
  const [authUser, setAuthUser] = useState<User | null>(null)
  const [authLoading, setAuthLoading] = useState(isSupabaseConfigured)
  const [demoMode, setDemoMode] = useState(false)
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('crm-user-profile')
    if (saved) return JSON.parse(saved) as UserProfile
    return defaultUserProfile
  })

  const usingDatabase = isSupabaseConfigured && authUser !== null

  const loadUserData = useCallback(async (userId: string) => {
    if (!supabase) return
    let { data: contactRows } = await supabase.from('contacts').select('*').eq('user_id', userId).order('created_at')
    let { data: dealRows } = await supabase.from('deals').select('*').eq('user_id', userId).order('created_at')

    if (!contactRows?.length) {
      await seedUserData(userId)
      const [c, d] = await Promise.all([
        supabase.from('contacts').select('*').eq('user_id', userId),
        supabase.from('deals').select('*').eq('user_id', userId),
      ])
      contactRows = c.data ?? []
      dealRows = d.data ?? []
    }

    if (contactRows) setContacts(contactRows.map(rowToContact))
    if (dealRows) setDeals(dealRows.map(rowToDeal))
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('crm-dark-mode', String(darkMode))
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('crm-user-profile', JSON.stringify(userProfile))
  }, [userProfile])

  useEffect(() => {
    if (!supabase) {
      setAuthLoading(false)
      return
    }
    supabase.auth.getSession().then(({ data: { session } }) => {
      setAuthUser(session?.user ?? null)
      if (session?.user) {
        const meta = session.user.user_metadata
        setUserProfile((p) => ({
          ...p,
          name: meta?.full_name || p.name,
          email: session.user.email || p.email,
        }))
        loadUserData(session.user.id)
      }
      setAuthLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuthUser(session?.user ?? null)
      if (session?.user) {
        loadUserData(session.user.id)
      } else {
        setContacts(initialContacts)
        setDeals(initialDeals)
      }
    })
    return () => subscription.unsubscribe()
  }, [loadUserData])

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const toggleSidebar = useCallback(() => setSidebarCollapsed((p) => !p), [])
  const toggleDarkMode = useCallback(() => setDarkMode((p) => !p), [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }, [])

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    if (!supabase) throw new Error('Supabase not configured')
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: name } },
    })
    if (error) throw error
    setUserProfile((p) => ({ ...p, name, email }))
  }, [])

  const signOut = useCallback(async () => {
    setDemoMode(false)
    if (supabase) await supabase.auth.signOut()
    setContacts(initialContacts)
    setDeals(initialDeals)
  }, [])

  const enterDemoMode = useCallback(() => {
    setDemoMode(true)
    setContacts(initialContacts)
    setDeals(initialDeals)
    setUserProfile({
      name: DEMO_ACCOUNT.name,
      email: DEMO_ACCOUNT.email,
      role: DEMO_ACCOUNT.role,
    })
  }, [])

  const addContact = useCallback(async (contact: Omit<Contact, 'id'>) => {
    if (usingDatabase && supabase && authUser) {
      const { data, error } = await supabase
        .from('contacts')
        .insert(contactToRow(contact, authUser.id))
        .select()
        .single()
      if (error) throw error
      setContacts((prev) => [...prev, rowToContact(data)])
    } else {
      setContacts((prev) => [...prev, { ...contact, id: crypto.randomUUID() }])
    }
  }, [usingDatabase, authUser])

  const updateContact = useCallback(async (id: string, updates: Partial<Contact>) => {
    if (usingDatabase && supabase) {
      const row: Record<string, unknown> = {}
      if (updates.name !== undefined) row.name = updates.name
      if (updates.email !== undefined) row.email = updates.email
      if (updates.company !== undefined) row.company = updates.company
      if (updates.phone !== undefined) row.phone = updates.phone
      if (updates.status !== undefined) row.status = updates.status
      if (updates.avatar !== undefined) row.avatar = updates.avatar
      if (updates.lastContact !== undefined) row.last_contact = updates.lastContact
      if (updates.value !== undefined) row.value = updates.value
      const { error } = await supabase.from('contacts').update(row).eq('id', id)
      if (error) throw error
    }
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }, [usingDatabase])

  const deleteContact = useCallback(async (id: string) => {
    if (usingDatabase && supabase) {
      const { error } = await supabase.from('contacts').delete().eq('id', id)
      if (error) throw error
    }
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }, [usingDatabase])

  const moveDeal = useCallback(async (dealId: string, newStage: Deal['stage']) => {
    const probability = newStage === 'closed' ? 100 : undefined
    if (usingDatabase && supabase) {
      const { error } = await supabase
        .from('deals')
        .update({ stage: newStage, ...(probability !== undefined && { probability }) })
        .eq('id', dealId)
      if (error) throw error
    }
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? { ...d, stage: newStage, probability: newStage === 'closed' ? 100 : d.probability }
          : d,
      ),
    )
  }, [usingDatabase])

  const addDeal = useCallback(async (deal: Omit<Deal, 'id'>) => {
    if (usingDatabase && supabase && authUser) {
      const { data, error } = await supabase
        .from('deals')
        .insert(dealToRow(deal, authUser.id))
        .select()
        .single()
      if (error) throw error
      setDeals((prev) => [...prev, rowToDeal(data)])
    } else {
      setDeals((prev) => [...prev, { ...deal, id: crypto.randomUUID() }])
    }
  }, [usingDatabase, authUser])

  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })))
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <CRMContext.Provider
      value={{
        view, setView, sidebarCollapsed, toggleSidebar, darkMode, toggleDarkMode,
        userProfile, updateUserProfile, contacts, addContact, updateContact, deleteContact,
        deals, moveDeal, addDeal, notifications, markNotificationRead, markAllNotificationsRead,
        unreadCount, searchQuery, setSearchQuery, authUser, authLoading, signIn, signUp, signOut,
        usingDatabase, demoMode, enterDemoMode,
      }}
    >
      {children}
    </CRMContext.Provider>
  )
}

export function useCRM() {
  const ctx = useContext(CRMContext)
  if (!ctx) throw new Error('useCRM must be used within CRMProvider')
  return ctx
}
