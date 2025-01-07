import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useEffect } from 'react'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useItems } from '../../hooks/useItems.tsx'
import './SingleItem.css'
import '../../App.css'
import './singleItemPane.css'
import helpers from '../../utils/helpers.tsx'
import Loading from '../../components/Loading.tsx'

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
        <p className={'message-spacing'}>
          Set URL /:id parameter to get an item by ID
        </p>
      ) : singleItem && !Array.isArray(singleItem) ? (
        <div className="single-item-display-container">
          <div className={`status-label ${singleItemStatus.statusType}`}>
            {singleItemStatus.status}
          </div>
          <div className="response-object-container">
            <div className="response-object-panel">
              {helpers.formatObjectAsJsxWithBoldKeys(singleItem)}
            </div>
          </div>
        </div>
      ) : (
        <div className="loading-container">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default SingleItem
