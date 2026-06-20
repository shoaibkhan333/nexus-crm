import { CRMProvider, useCRM } from './context/CRMContext'
import { Layout } from './components/layout/Layout'
import { LoginPage } from './components/auth/LoginPage'
import { isSupabaseConfigured } from './lib/supabase'

function AppGate() {
  const { authUser, authLoading } = useCRM()

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 dark:bg-slate-950">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
      </div>
    )
  }

  if (isSupabaseConfigured && !authUser) {
    return <LoginPage />
  }

  return <Layout />
}

export default function App() {
  return (
    <CRMProvider>
      <AppGate />
    </CRMProvider>
  )
}
