import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useEffect } from 'react'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useItems } from '../../hooks/useItems.tsx'
import './SingleItem.css'
import '../../App.css'
import './singleItemPane.css'
import Loading from '../../components/Loading.tsx'
import ObjectDisplay from '../../components/ObjectDisplay.tsx'
import { useOperation } from '../../hooks/useOperation.tsx'

const GetByIdResponse = () => {
  const { operation } = useOperation()
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { singleItem, getSingleItem, getItemByIdError, singleItemStatus } =
    useItems()

  console.log('singleItem', singleItem)

  useEffect(() => {
    if (operation === 'getById') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      getSingleItem()
    }
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
        <div className="fixed-height-display-container">
          <div className={`status-label ${singleItemStatus.statusType}`}>
            {singleItemStatus.status}
          </div>
          <ObjectDisplay object={singleItem} heightClassPrefix={'get-by-id'} />
        </div>
      ) : (
        <div className="loading-container">
          <Loading />
        </div>
      )}
    </div>
  )
}

export default GetByIdResponse
