import { CRMProvider } from './context/CRMContext'
import { Layout } from './components/layout/Layout'

export default function App() {
  return (
    <CRMProvider>
      <Layout />
    </CRMProvider>
  )
}
