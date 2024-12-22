import { useEffect } from 'react'
import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import ListItem from './ListItem.tsx'
import { useItems } from '../hooks/useItems.tsx'

function List() {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { items, getAllItems, getAllItemsError, getItemsStatus } = useItems()

  useEffect(() => {
    getAllItems()
  }, [baseUrl, endpoint])

  useEffect(() => {
    console.log("status for get items:", JSON.stringify(getItemsStatus, null, 2))
  }, [baseUrl, endpoint])

  return (
    <div id="list-container">
      {getAllItemsError ? (
        <p>{getAllItemsError}</p>
      ) : Array.isArray(items) && items.length > 0 ? (
        <div>
          {items.map((item, index) => (
            <ListItem item={item} key={item?._id || item?.id || index} />
          ))}
        </div>
      ) : Array.isArray(items) && items.length === 0 ? (
        <div className="flex-container">
          {`There are no ${endpoint.replace(/^\/+/, '')} to display`}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )
}

export default List
