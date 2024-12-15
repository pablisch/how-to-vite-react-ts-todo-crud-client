import './App.css'
import BaseUrlForm from './components/BaseUrlForm.tsx'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompleteUrlBar from './components/CompleteUrlBar.tsx'
import UrlEndpointForm from './components/UrlEndpointForm.tsx'
import { EndpointProvider } from './context/EndpointContext.tsx'
import { IdParamsProvider } from './context/IdParamsContext.tsx'
import UrlIdParamsForm from './components/UrlIdParamsForm.tsx'
import MainPage from './pages/MainPage.tsx'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <BaseUrlProvider>
          <EndpointProvider>
            <IdParamsProvider>
              <CompleteUrlBar />
              <BaseUrlForm />
              <UrlEndpointForm />
              <UrlIdParamsForm />
              <Routes>
                <Route path="/" element={<MainPage />} />
              </Routes>
            </IdParamsProvider>
          </EndpointProvider>
        </BaseUrlProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
