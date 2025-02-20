import './App.css'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EndpointProvider } from './context/EndpointContext.tsx'
import { IdParamsProvider } from './context/IdParamsContext.tsx'
import MainPage from './pages/MainPage.tsx'
import { QueryParamsProvider } from './context/QueryParamsContext.tsx'
import './global.css'
import './colours.css'
import './themes.css'
import { ItemsProvider } from './context/ItemsContext.tsx'
import UrlComponents from './features/urlForms/UrlComponents.tsx'
import Navbar from './features/navbar/Navbar.tsx'
import { useSettings } from './hooks/useSettings.tsx'
import Settings from './features/settings/Settings.tsx'
import { SaveProvider } from './context/SaveContext.tsx'

function App() {
  const { menuIsOpen, settings } = useSettings()

  return (
    <div id="app" data-theme={settings.theme}>
      <BrowserRouter>
        <SaveProvider>
          <BaseUrlProvider>
            <EndpointProvider>
              <IdParamsProvider>
                <QueryParamsProvider>
                  <ItemsProvider>
                    <Navbar />
                    {menuIsOpen && <Settings />}
                    <div id="main-page-container">
                      <UrlComponents />
                      <Routes>
                        <Route path="/" element={<MainPage />} />
                      </Routes>
                    </div>
                  </ItemsProvider>
                </QueryParamsProvider>
              </IdParamsProvider>
            </EndpointProvider>
          </BaseUrlProvider>
        </SaveProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
