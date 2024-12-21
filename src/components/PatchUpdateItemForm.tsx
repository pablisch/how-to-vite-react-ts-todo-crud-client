import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useEffect } from 'react'
import { UnknownObject } from '../types/types.ts'
import { useIdParams } from '../hooks/useIdParams.tsx'
import { useItems } from '../hooks/useItems.tsx'
import '../css/SingleItem.css'
import '../App.css'

const PatchUpdateItemForm = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { singleItem, getSingleItem, getSingleItemError } = useItems()

  // useEffect(() => {
  //   // console.log('something changed')
  //   getSingleItem()
  // }, [baseUrl, endpoint, idParams])

  return (
    <div id="single-item-container">
      {getSingleItemError ? (
        <pre className="error-message">{getSingleItemError}</pre>
      ) : !idParams ? (
        <p>Set URL /:id parameter to get an item by ID</p>
      ) : singleItem && !Array.isArray(singleItem) ? (
        <div className="single-item-display">
          <p>
            <strong>Update Form</strong>
          </p>
          {formatObjectAsJSX(singleItem)}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )

  // Function to format object as JSX with bold keys
  function formatObjectAsJSX(obj: UnknownObject): React.ReactNode {
    if (typeof obj !== 'object' || obj === null) {
      return <span>{String(obj)}</span> // Return the value itself if it's not an object
    }

    return (
      <>
        <br />
        <ul className="single-item-details">
          {Object.entries(obj).map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong>:{' '}
              {typeof value === 'object' && value !== null ? (
                formatObjectAsJSX(value) // Recursively render nested objects
              ) : (
                <span>{String(value)}</span>
              )}
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default PatchUpdateItemForm
