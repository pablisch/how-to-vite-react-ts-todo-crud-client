import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useItems } from '../../hooks/useItems.tsx'
import './SingleItem.css'
import '../../App.css'
import './singleItemPane.css'
import Loading from '../../components/Loading.tsx'
import ObjectDisplay from '../../components/ObjectDisplay.tsx'
import { useEffect } from 'react'

const GetByIdResponse = () => {
  const { idParams } = useIdParams()
  const { singleItem, getItemByIdError, singleItemStatus, getSingleItem } =
    useItems()

  useEffect(() => {
    if (!singleItem) getSingleItem(idParams)
  }, [])

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
