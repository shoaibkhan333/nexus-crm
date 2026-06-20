import { useState, useRef, useEffect } from 'react'
import clsx from 'clsx'
import { Search, Bell, Moon, Sun, Menu, LogOut } from 'lucide-react'
import { useCRM } from '../../context/CRMContext'
import { getFirstName, getInitials } from '../../data/mockData'
import { isSupabaseConfigured } from '../../lib/supabase'

const viewTitles: Record<string, string> = {
  dashboard: 'Dashboard',
  contacts: 'Contacts',
  deals: 'Deals Pipeline',
  analytics: 'Analytics',
  settings: 'Settings',
}

export function Header() {
  const {
    view,
    darkMode,
    toggleDarkMode,
    toggleSidebar,
    searchQuery,
    setSearchQuery,
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    unreadCount,
    userProfile,
    signOut,
    usingDatabase,
    demoMode,
    authUser,
  } = useCRM()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const canLogout = isSupabaseConfigured || demoMode || Boolean(authUser)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false)
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/80 px-6 backdrop-blur-xl dark:border-slate-700/80 dark:bg-slate-900/80">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">{viewTitles[view]}</h2>
          <p className="text-xs text-slate-500">Welcome back, {getFirstName(userProfile.name)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search contacts, deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2 pl-10 pr-4 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-brand-400"
          />
        </div>

        <button
          onClick={toggleDarkMode}
          className="rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <span className="absolute right-1.5 top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Notifications</h3>
                <button
                  onClick={markAllNotificationsRead}
                  className="text-xs font-medium text-brand-600 hover:text-brand-700 dark:text-brand-400"
                >
                  Mark all read
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <button
                    key={n.id}
                    onClick={() => markNotificationRead(n.id)}
                    className={clsx(
                      'flex w-full flex-col gap-0.5 border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-700/50',
                      !n.read && 'bg-brand-50/50 dark:bg-brand-900/10',
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {!n.read && <span className="h-2 w-2 rounded-full bg-brand-500" />}
                      <span className="text-sm font-medium text-slate-900 dark:text-white">{n.title}</span>
                    </div>
                    <p className="text-xs text-slate-500">{n.message}</p>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => canLogout && setShowProfileMenu(!showProfileMenu)}
            className={clsx(
              'flex items-center gap-2 rounded-xl border border-slate-200 py-1.5 pl-1.5 pr-3 transition dark:border-slate-700',
              canLogout && 'hover:bg-slate-50 dark:hover:bg-slate-800',
            )}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-bold text-white">
              {getInitials(userProfile.name)}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-slate-900 dark:text-white">{userProfile.name}</p>
              <p className="text-[10px] text-slate-500">
                {demoMode ? 'Demo Account' : userProfile.role}
                {usingDatabase && ' · Cloud sync'}
              </p>
            </div>
          </button>

          {showProfileMenu && canLogout && (
            <div className="absolute right-0 top-full mt-2 w-52 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl dark:border-slate-700 dark:bg-slate-800">
              <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-900 dark:text-white">{userProfile.name}</p>
                <p className="truncate text-xs text-slate-500">{userProfile.email}</p>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false)
                  signOut()
                }}
                className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
