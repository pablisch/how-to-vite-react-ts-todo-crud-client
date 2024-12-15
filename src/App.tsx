import './App.css'
import BaseUrlForm from './components/BaseUrlForm.tsx'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompleteUrlBar from './components/CompleteUrlBar.tsx'
import EndpointForm from './components/EndpointForm.tsx'
import { EndpointProvider } from './context/EndpointContext.tsx'
import { IdParamsProvider } from './context/IdParamsContext.tsx'
import IdParamsForm from './components/IdParamsForm.tsx'
import MainPage from './pages/MainPage.tsx'
import { QueryParamsProvider } from './context/QueryParamsContext.tsx'
import QueryParamsForm from './components/QueryParamsForm.tsx'

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <BaseUrlProvider>
          <EndpointProvider>
            <IdParamsProvider>
              <QueryParamsProvider>
                <CompleteUrlBar />
                <BaseUrlForm />
                <EndpointForm />
                <IdParamsForm />
                <QueryParamsForm />
                <Routes>
                  <Route path="/" element={<MainPage />} />
                </Routes>
              </QueryParamsProvider>
            </IdParamsProvider>
          </EndpointProvider>
        </BaseUrlProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
