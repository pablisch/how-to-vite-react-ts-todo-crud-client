import axios from 'axios'
import { useEffect, useState } from 'react'
import { Todo } from '../types/todo.types.ts'
import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'

function List() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [todoError, setTodoError] = useState<string | null>(null)

  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()

  const getTodoData = async () => {
    setTodoError(null)
    try {
      const response = await axios.get(`${baseUrl}/${endpoint}`)
      // console.log("response in List:", response.data)
      setTodos(response.data)

      return response.data
    } catch (error) {
      console.error('Error fetching todo data:', error)
      setTodoError('Failed to fetch data')
    }
  }

  useEffect(() => {
    getTodoData()
  }, [baseUrl, endpoint])

  return (
    <div id="list-container">
      {todoError ? (
        <p>{todoError}</p>
      ) : typeof todos === 'object' && todos.length > 0 ? (
        <div>
          {todos.map(todo => (
            <div className="item-panel" key={todo._id}>
              <p>ID: {todo._id}</p>
              <p>Task: {todo.task}</p>
              <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
              <p>Created at: {new Date(todo.createdAt).toLocaleString()}</p>
              <p>Updated at: {new Date(todo.updatedAt).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default List
