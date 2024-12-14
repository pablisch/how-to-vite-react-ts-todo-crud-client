import './App.css'
import BaseUrlForm from './components/BaseUrlForm.tsx'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'
import List from './components/List.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompleteUrl from './components/CompleteUrl.tsx'
import UrlEndpointForm from './components/UrlEndpointForm.tsx'
import { EndpointProvider } from './context/EndpointContext.tsx'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <BaseUrlProvider>
          <EndpointProvider>
            <CompleteUrl />
            <BaseUrlForm />
            <UrlEndpointForm />
            <Routes>
              <Route path="/" element={<List />} />
            </Routes>
          </EndpointProvider>
        </BaseUrlProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
