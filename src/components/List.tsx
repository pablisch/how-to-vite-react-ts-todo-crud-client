import axios from 'axios'
import { useEffect, useState } from 'react'
import { UnknownObject } from '../types/types.ts'
import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import ListItem from './ListItem.tsx'

function List() {
  const [items, setItems] = useState<UnknownObject[]>([])
  const [itemError, setItemError] = useState<string | null>(null)

  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()

  const getItemData = async () => {
    setItemError(null)
    try {
      const response = await axios.get(`${baseUrl}/${endpoint}`)
      setItems(response.data)

      return response.data
    } catch (error) {
      console.error('Error fetching item data:', error)
      setItemError('Failed to fetch data')
    }
  }

  useEffect(() => {
    getItemData()
  }, [baseUrl, endpoint])

  return (
    <div id="list-container">
      {itemError ? (
        <p>{itemError}</p>
      ) : typeof items === 'object' && items.length > 0 ? (
        <div>
          {items.map((item, index) => (
            <ListItem item={item} key={item?._id || item?.id || index} />
            // <div className="item-panel" key={item._id}>
            //   <p>ID: {item._id}</p>
            //   <p>Task: {item.task}</p>
            //   <p>Completed: {item.completed ? 'Yes' : 'No'}</p>
            //   <p>Created at: {new Date(item.createdAt).toLocaleString()}</p>
            //   <p>Updated at: {new Date(item.updatedAt).toLocaleString()}</p>
            // </div>
          ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default List
