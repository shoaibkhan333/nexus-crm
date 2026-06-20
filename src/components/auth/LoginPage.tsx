import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, Loader2 } from 'lucide-react'
import { useCRM } from '../../context/CRMContext'
import { isSupabaseConfigured } from '../../lib/supabase'

export function LoginPage() {
  const { signIn, signUp, darkMode, toggleDarkMode } = useCRM()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else {
        if (!name.trim()) throw new Error('Please enter your name')
        await signUp(email, password, name.trim())
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="hidden w-1/2 flex-col justify-between bg-gradient-to-br from-brand-600 via-brand-700 to-violet-800 p-12 lg:flex">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
            <Zap className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">NexusCRM</span>
        </div>
        <div>
          <h1 className="text-4xl font-bold leading-tight text-white">
            Manage your sales pipeline like a pro
          </h1>
          <p className="mt-4 text-lg text-white/80">
            Track contacts, close deals, and visualize revenue — all in one dashboard.
          </p>
        </div>
        <p className="text-sm text-white/60">© 2026 NexusCRM. Built with React + Supabase.</p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center p-6">
        <button
          onClick={toggleDarkMode}
          className="absolute right-6 top-6 rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-500 dark:border-slate-700"
        >
          {darkMode ? 'Light' : 'Dark'} mode
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="mb-8 text-center lg:text-left">
            <div className="mb-4 flex items-center justify-center gap-2 lg:hidden">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-slate-900 dark:text-white">NexusCRM</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {mode === 'login' ? 'Welcome back' : 'Create account'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {mode === 'login' ? 'Sign in to your CRM dashboard' : 'Start managing your sales today'}
            </p>
          </div>

          {!isSupabaseConfigured && (
            <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800 dark:border-amber-800 dark:bg-amber-900/20 dark:text-amber-300">
              Supabase not configured — add <code className="font-mono">.env</code> file. See{' '}
              <code className="font-mono">SUPABASE-SETUP.md</code>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-1 block text-xs font-medium text-slate-500">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Shoaib Khan"
                    className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  />
                </div>
              </div>
            )}
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-slate-500">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-brand-500 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 py-3 text-sm font-semibold text-white transition hover:bg-brand-600 disabled:opacity-50"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-slate-500">
            {mode === 'login' ? "Don't have an account?" : 'Already have an account?'}{' '}
            <button
              type="button"
              onClick={() => {
                setMode(mode === 'login' ? 'signup' : 'login')
                setError('')
              }}
              className="font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400"
            >
              {mode === 'login' ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}
