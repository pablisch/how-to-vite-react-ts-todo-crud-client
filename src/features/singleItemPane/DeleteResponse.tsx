import { useItems } from '../../hooks/useItems.tsx'
import './SingleItem.css'
import '../../App.css'
import './singleItemPane.css'
import helpers from '../../utils/helpers.tsx'
import Loading from '../../components/Loading.tsx'

const DeleteResponse = () => {
  const { deleteItemError, deleteResponseData, deleteStatus } = useItems()

  return (
    <div id="delete-item-operation-container">
      {deleteItemError ? (
        <pre className="error-message">{deleteItemError}</pre>
      ) : deleteResponseData && !Array.isArray(deleteResponseData) ? (
        <div className="delete-response-container">
          <div className={`status-label ${deleteStatus?.statusType}`}>
            {deleteStatus.status}
          </div>
          <div className="response-object-container">
            <div className="response-object-panel">
              {helpers.formatObjectAsJsxWithBoldKeys(deleteResponseData)}
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

export default DeleteResponse
