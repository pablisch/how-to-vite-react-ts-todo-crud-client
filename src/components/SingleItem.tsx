import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { UnknownObject } from '../types/types.ts'
import { useUrlParams } from '../hooks/useUrlParams.tsx'

const SingleItem = () => {
  const [item, setItem] = useState<UnknownObject | null>()
  const [itemError, setItemError] = useState<string | null>(null)

  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { params } = useUrlParams()
  console.log('Params', params)

  const getListData = async () => {
    console.log('calling...', `${baseUrl}/${endpoint}/${params}`)
    setItemError(null)
    try {
      const response = await axios.get(`${baseUrl}/${endpoint}/${params}`)
      console.log('response in Single Item:', response.data)
      setItem(response.data)

      return response.data
    } catch (error) {
      console.error('Error fetching single item data:', error)
      setItemError(`Failed to fetch data for item with ID: ${params}`)
    }
  }

  useEffect(() => {
    console.log('something changed')
    getListData()
  }, [baseUrl, endpoint, params])

  return (
    <div id="single-item-container">
      {itemError ? (
        <p>{itemError}</p>
      ) : !params ? (
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
