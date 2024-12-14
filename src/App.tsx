import './App.css'
import BaseUrlForm from './components/BaseUrlForm.tsx'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'

function App() {
  return (
    <BaseUrlProvider>
      <BaseUrlForm />
    </BaseUrlProvider>
  )
}

export default App
