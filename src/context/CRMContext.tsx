import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react'
import type { Contact, Deal, Notification, UserProfile, View } from '../types'
import { initialContacts, initialDeals, notifications as initialNotifications, defaultUserProfile } from '../data/mockData'

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
  addContact: (contact: Omit<Contact, 'id'>) => void
  updateContact: (id: string, contact: Partial<Contact>) => void
  deleteContact: (id: string) => void
  deals: Deal[]
  moveDeal: (dealId: string, newStage: Deal['stage']) => void
  addDeal: (deal: Omit<Deal, 'id'>) => void
  notifications: Notification[]
  markNotificationRead: (id: string) => void
  markAllNotificationsRead: () => void
  unreadCount: number
  searchQuery: string
  setSearchQuery: (query: string) => void
}

const CRMContext = createContext<CRMContextValue | null>(null)

export function CRMProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('crm-dark-mode') === 'true'
    }
    return false
  })
  const [contacts, setContacts] = useState<Contact[]>(initialContacts)
  const [deals, setDeals] = useState<Deal[]>(initialDeals)
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [searchQuery, setSearchQuery] = useState('')
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('crm-user-profile')
      if (saved) return JSON.parse(saved) as UserProfile
    }
    return defaultUserProfile
  })

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('crm-dark-mode', String(darkMode))
  }, [darkMode])

  useEffect(() => {
    localStorage.setItem('crm-user-profile', JSON.stringify(userProfile))
  }, [userProfile])

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const toggleSidebar = useCallback(() => setSidebarCollapsed((p) => !p), [])
  const toggleDarkMode = useCallback(() => setDarkMode((p) => !p), [])

  const addContact = useCallback((contact: Omit<Contact, 'id'>) => {
    setContacts((prev) => [...prev, { ...contact, id: crypto.randomUUID() }])
  }, [])

  const updateContact = useCallback((id: string, updates: Partial<Contact>) => {
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)))
  }, [])

  const deleteContact = useCallback((id: string) => {
    setContacts((prev) => prev.filter((c) => c.id !== id))
  }, [])

  const moveDeal = useCallback((dealId: string, newStage: Deal['stage']) => {
    setDeals((prev) =>
      prev.map((d) =>
        d.id === dealId
          ? { ...d, stage: newStage, probability: newStage === 'closed' ? 100 : d.probability }
          : d,
      ),
    )
  }, [])

  const addDeal = useCallback((deal: Omit<Deal, 'id'>) => {
    setDeals((prev) => [...prev, { ...deal, id: crypto.randomUUID() }])
  }, [])

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
        view,
        setView,
        sidebarCollapsed,
        toggleSidebar,
        darkMode,
        toggleDarkMode,
        userProfile,
        updateUserProfile,
        contacts,
        addContact,
        updateContact,
        deleteContact,
        deals,
        moveDeal,
        addDeal,
        notifications,
        markNotificationRead,
        markAllNotificationsRead,
        unreadCount,
        searchQuery,
        setSearchQuery,
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
