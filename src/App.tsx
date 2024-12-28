import './App.css'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CompleteUrlBar from './components/CompleteUrlBar.tsx'
import { EndpointProvider } from './context/EndpointContext.tsx'
import { IdParamsProvider } from './context/IdParamsContext.tsx'
import MainPage from './pages/MainPage.tsx'
import { QueryParamsProvider } from './context/QueryParamsContext.tsx'
import './global.css'
import { ItemsProvider } from './context/ItemsContext.tsx'
import UrlComponents from './components/UrlComponents.tsx'
import ControlBar from './components/ControlBar.tsx'
import { useSettings } from './hooks/useSettings.tsx'
import Settings from './components/Settings.tsx'

function App() {
  const { menuIsOpen } = useSettings()

  return (
    <div id="app">
      <BrowserRouter>
        <BaseUrlProvider>
          <EndpointProvider>
            <IdParamsProvider>
              <QueryParamsProvider>
                <ItemsProvider>
                  <ControlBar />
                  {menuIsOpen && <Settings />}
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
