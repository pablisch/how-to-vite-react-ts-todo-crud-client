import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Todo } from '../types/todo.types.ts'
import { useUrlParams } from '../hooks/useUrlParams.tsx'

const SingleItem = () => {
  const [todo, setTodo] = useState<Todo | null>()
  const [todoError, setTodoError] = useState<string | null>(null)

  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { params } = useUrlParams()
  console.log('Params', params)

  const getTodoData = async () => {
    console.log('calling...', `${baseUrl}/${endpoint}/${params}`)
    setTodoError(null)
    try {
      const response = await axios.get(`${baseUrl}/${endpoint}/${params}`)
      console.log('response in Single Item:', response.data)
      setTodo(response.data)

      return response.data
    } catch (error) {
      console.error('Error fetching single todo data:', error)
      setTodoError(`Failed to fetch data for todo with ID: ${params}`)
    }
  }

  useEffect(() => {
    console.log('something changed')
    getTodoData()
  }, [baseUrl, endpoint, params])

  return (
    <div id="single-item-container">
      {todoError ? (
        <p>{todoError}</p>
      ) : todo ? (
        <div>{todo?.task}</div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default SingleItem
