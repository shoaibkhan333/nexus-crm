import { useState } from 'react'
import { motion } from 'framer-motion'
import { Zap, Mail, Lock, User, Loader2, Play, Copy, Check } from 'lucide-react'
import { useCRM } from '../../context/CRMContext'
import { isSupabaseConfigured } from '../../lib/supabase'
import { DEMO_ACCOUNT } from '../../data/mockData'

export function LoginPage() {
  const { signIn, signUp, darkMode, toggleDarkMode, enterDemoMode } = useCRM()
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState<string | null>(null)

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

  function fillDemoCredentials() {
    setEmail(DEMO_ACCOUNT.email)
    setPassword(DEMO_ACCOUNT.password)
    setMode('login')
    setError('')
  }

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text)
    setCopied(key)
    setTimeout(() => setCopied(null), 1500)
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
          <div className="mt-8 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-semibold text-white">Recruiters & visitors</p>
            <p className="mt-2 text-sm text-white/80">
              No account needed — click <strong>Try Demo</strong> to explore the full dashboard instantly with sample data.
            </p>
          </div>
        </div>
        <p className="text-sm text-white/60">© 2026 NexusCRM. Built with React + Supabase.</p>
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center overflow-y-auto p-6">
        <button
          onClick={toggleDarkMode}
          className="absolute right-6 top-6 rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-500 dark:border-slate-700"
        >
          {darkMode ? 'Light' : 'Dark'} mode
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="my-8 w-full max-w-md"
        >
          <div className="mb-6 text-center lg:text-left">
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
              {mode === 'login' ? 'Sign in or use the demo account below' : 'Create an account to save your data'}
            </p>
          </div>

          {/* Demo account box */}
          <div className="mb-5 rounded-2xl border-2 border-brand-200 bg-brand-50/50 p-4 dark:border-brand-800 dark:bg-brand-900/20">
            <p className="text-sm font-semibold text-brand-800 dark:text-brand-300">
              Try the project — Demo Account
            </p>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
              Explore the full CRM without signing up. Sample contacts, deals & charts included.
            </p>
            <div className="mt-3 space-y-2 rounded-xl bg-white/80 p-3 dark:bg-slate-800/80">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Email</span>
                <div className="flex items-center gap-1.5">
                  <code className="font-mono text-slate-800 dark:text-slate-200">{DEMO_ACCOUNT.email}</code>
                  <button
                    type="button"
                    onClick={() => copyText(DEMO_ACCOUNT.email, 'email')}
                    className="rounded p-0.5 text-slate-400 hover:text-brand-600"
                  >
                    {copied === 'email' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Password</span>
                <div className="flex items-center gap-1.5">
                  <code className="font-mono text-slate-800 dark:text-slate-200">{DEMO_ACCOUNT.password}</code>
                  <button
                    type="button"
                    onClick={() => copyText(DEMO_ACCOUNT.password, 'pass')}
                    className="rounded p-0.5 text-slate-400 hover:text-brand-600"
                  >
                    {copied === 'pass' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={enterDemoMode}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-500 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-600"
              >
                <Play className="h-4 w-4" />
                Try Demo
              </button>
              <button
                type="button"
                onClick={fillDemoCredentials}
                className="rounded-xl border border-brand-300 px-4 py-2.5 text-sm font-medium text-brand-700 transition hover:bg-brand-100 dark:border-brand-700 dark:text-brand-300 dark:hover:bg-brand-900/40"
              >
                Fill credentials
              </button>
            </div>
          </div>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-slate-50 px-3 text-slate-400 dark:bg-slate-950">or sign in with your account</span>
            </div>
          </div>

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
                {error.toLowerCase().includes('api key') && (
                  <span className="mt-1 block text-xs">Use <strong>Try Demo</strong> above to explore without an account.</span>
                )}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !isSupabaseConfigured}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700"
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
