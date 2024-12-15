import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { UnknownObject } from '../types/types.ts'
import { useIdParams } from '../hooks/useIdParams.tsx'
import { useQueryParams } from '../hooks/useQueryParams.tsx'

const SingleItem = () => {
  const [item, setItem] = useState<UnknownObject | null>()
  const [itemError, setItemError] = useState<string | null>(null)

  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  console.log('Params', idParams)

  const getListData = async () => {
    console.log('calling...', `${baseUrl}${endpoint}${idParams}${queryParams}`)
    setItemError(null)
    try {
      const response = await axios.get(
        `${baseUrl}${endpoint}${idParams}${queryParams}`
      )
      console.log('response in Single Item:', response.data)
      setItem(response.data)

      return response.data
    } catch (error) {
      console.error('Error fetching single item data:', error)
      setItemError(`Failed to fetch data for item with ID: ${idParams}`)
    }
  }

  useEffect(() => {
    console.log('something changed')
    getListData()
  }, [baseUrl, endpoint, idParams])

  return (
    <div id="single-item-container">
      {itemError ? (
        <p>{itemError}</p>
      ) : !idParams ? (
        <p>Set URL /:id parameter to get an item by ID</p>
      ) : item && !Array.isArray(item) ? (
        Object.entries(item).map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {String(value)}
          </p>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default SingleItem
