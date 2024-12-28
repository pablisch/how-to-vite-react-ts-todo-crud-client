import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useEffect } from 'react'
import { useIdParams } from '../hooks/useIdParams.tsx'
import { useItems } from '../hooks/useItems.tsx'
import '../css/SingleItem.css'
import '../App.css'
import '../css/right-hand-pane.css'
import helpers from '../utils/helpers.tsx'

const SingleItem = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const {
    singleItem,
    getSingleItem,
    getItemByIdError,
    operation,
    singleItemStatus,
  } = useItems()

  useEffect(() => {
    if (operation === 'getById') getSingleItem()
  }, [baseUrl, endpoint, idParams])

  return (
    <div id="single-item-operation-container">
      {getItemByIdError ? (
        <pre className="error-message">{getItemByIdError}</pre>
      ) : !idParams ? (
        <p>Set URL /:id parameter to get an item by ID</p>
      ) : singleItem && !Array.isArray(singleItem) ? (
        <div className="single-item-display">
          <div className={`status-label ${singleItemStatus.statusType}`}>
            {singleItemStatus.status}
          </div>
          {helpers.formatObjectAsJsxWithBoldKeys(singleItem)}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )

  // function formatObjectAsJsxWithBoldKeys(obj: UnknownObject): React.ReactNode {
  //   if (typeof obj !== 'object' || obj === null) {
  //     return <span>{String(obj)}</span>
  //   }
  //
  //   return (
  //     <ul className="single-item-details">
  //       {Object.entries(obj).map(([key, value]) => (
  //         <li key={key}>
  //           <strong>{key}</strong>:{' '}
  //           {typeof value === 'object' && value !== null ? (
  //             formatObjectAsJsxWithBoldKeys(value) // Recursively render nested objects
  //           ) : (
  //             <span>{String(value)}</span>
  //           )}
  //         </li>
  //       ))}
  //     </ul>
  //   )
  // }
}

export default SingleItem
