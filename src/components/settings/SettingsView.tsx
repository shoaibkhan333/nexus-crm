import { useState } from 'react'
import { useCRM } from '../../context/CRMContext'

export function SettingsView() {
  const { darkMode, toggleDarkMode, userProfile, updateUserProfile } = useCRM()
  const [form, setForm] = useState(userProfile)
  const [saved, setSaved] = useState(false)

  function handleSave() {
    updateUserProfile(form)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-800/80">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Appearance</h3>
        <p className="mt-1 text-sm text-slate-500">Customize how NexusCRM looks on your device</p>
        <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Dark Mode</p>
            <p className="text-xs text-slate-500">Switch between light and dark themes</p>
          </div>
          <button
            onClick={toggleDarkMode}
            className={`relative h-7 w-12 rounded-full transition ${darkMode ? 'bg-brand-500' : 'bg-slate-300'}`}
          >
            <span
              className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${darkMode ? 'translate-x-5' : 'translate-x-0.5'}`}
            />
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-800/80">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Profile</h3>
        <p className="mt-1 text-sm text-slate-500">Your name appears in the header and across the dashboard</p>
        <div className="mt-4 space-y-4">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Full Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your full name"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Enter your email"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-500">Role</label>
            <input
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              placeholder="e.g. Sales Manager"
              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            />
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            {saved && (
              <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Profile saved!</span>
            )}
            <button
              onClick={handleSave}
              className="rounded-xl bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              Save Profile
            </button>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-slate-700/80 dark:bg-slate-800/80">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">Notifications</h3>
        <p className="mt-1 text-sm text-slate-500">Configure how you receive alerts</p>
        <div className="mt-4 space-y-3">
          {['Email notifications', 'Deal stage changes', 'New lead assignments', 'Weekly reports'].map((item) => (
            <label key={item} className="flex items-center justify-between rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <span className="text-sm text-slate-700 dark:text-slate-300">{item}</span>
              <input type="checkbox" defaultChecked className="h-4 w-4 rounded accent-brand-500" />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
