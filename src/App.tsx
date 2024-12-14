import './App.css'
import BaseUrlForm from './components/BaseUrlForm.tsx'
import { BaseUrlProvider } from './context/baseUrlContext.tsx'
import TodoList from './components/TodoList.tsx'

function App() {
  return (
    <BaseUrlProvider>
      <BaseUrlForm />
      <TodoList />
    </BaseUrlProvider>
  )
}

export default App
