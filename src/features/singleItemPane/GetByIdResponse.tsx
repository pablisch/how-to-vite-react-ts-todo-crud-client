import { useBaseUrl } from '../../hooks/useBaseUrl'
import { useEndpoint } from '../../hooks/useEndpoint'
import { useIdParams } from '../../hooks/useIdParams'
import { useItems } from '../../hooks/useItems'
import { useOperation } from '../../hooks/useOperation'
import { useMemo } from 'react'
import './SingleItem.css'
import '../../App.css'
import './singleItemPane.css'
import Loading from '../../components/Loading'
import ObjectDisplay from '../../components/ObjectDisplay'

const GetByIdResponse = () => {
  const { operation } = useOperation()
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { singleItem, getSingleItem, getItemByIdError, singleItemStatus } =
    useItems()

  // Memoize the data fetching logic based only on the required dependencies
  useMemo(() => {
    if (operation === 'getById' && idParams) {
      getSingleItem(false, idParams)
    }
  }, [baseUrl, endpoint, idParams]) // Notice operation is not a dependency

  // Memoize the rendered content to prevent unnecessary re-renders
  const content = useMemo(() => {
    if (getItemByIdError) {
      return <pre className="error-message">{getItemByIdError}</pre>
    }

    if (!idParams) {
      return (
        <p className="message-spacing">
          Set URL /:id parameter to get an item by ID
        </p>
      )
    }

    if (!singleItem && operation === 'getById') {
      return (
        <div className="loading-container">
          <Loading />
        </div>
      )
    }

    if (singleItem && !Array.isArray(singleItem)) {
      return (
        <div className="fixed-height-display-container">
          <div className={`status-label ${singleItemStatus.statusType}`}>
            {singleItemStatus.status}
          </div>
          <ObjectDisplay object={singleItem} heightClassPrefix="get-by-id" />
        </div>
      )
    }

    return null
  }, [singleItem, getItemByIdError, idParams, operation, singleItemStatus])

  return <div id="single-item-operation-container">{content}</div>
}

export default GetByIdResponse
