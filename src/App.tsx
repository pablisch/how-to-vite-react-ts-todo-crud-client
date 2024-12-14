import './App.css'
import BaseUrlForm from './components/BaseUrlForm.tsx'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'
import List from './components/List.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <BaseUrlProvider>
          <BaseUrlForm />
          <Routes>
            <Route path="/" element={<List />} />
          </Routes>
        </BaseUrlProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
