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
