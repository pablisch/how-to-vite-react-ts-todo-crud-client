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
import './global.css'
import { ItemsProvider } from './context/ItemsContext.tsx'
import UrlComponents from './components/UrlComponents.tsx'

function App() {
  return (
    <div id="app">
      <BrowserRouter>
        <BaseUrlProvider>
          <EndpointProvider>
            <IdParamsProvider>
              <QueryParamsProvider>
                <ItemsProvider>
                  <CompleteUrlBar />
                  <UrlComponents />
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                  </Routes>
                </ItemsProvider>
              </QueryParamsProvider>
            </IdParamsProvider>
          </EndpointProvider>
        </BaseUrlProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
