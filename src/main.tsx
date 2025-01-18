import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { SettingsProvider } from './context/SettingsContext.tsx'
import { OperationProvider } from './context/OperationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <OperationProvider>
        <App />
      </OperationProvider>
    </SettingsProvider>
  </StrictMode>
)
