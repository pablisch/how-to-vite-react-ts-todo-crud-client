import './App.css'
import BaseUrlForm from './components/BaseUrlForm.tsx'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompleteUrlBar from './components/CompleteUrlBar.tsx'
import UrlEndpointForm from './components/UrlEndpointForm.tsx'
import { EndpointProvider } from './context/EndpointContext.tsx'
import { ParamsProvider } from './context/ParamsContext.tsx'
import UrlParamsForm from './components/UrlParamsForm.tsx'
import MainPage from './pages/MainPage.tsx'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <BaseUrlProvider>
          <EndpointProvider>
            <ParamsProvider>
              <CompleteUrlBar />
              <BaseUrlForm />
              <UrlEndpointForm />
              <UrlParamsForm />
              <Routes>
                <Route path="/" element={<MainPage />} />
              </Routes>
            </ParamsProvider>
          </EndpointProvider>
        </BaseUrlProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
