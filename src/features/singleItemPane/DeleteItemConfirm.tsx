import { useItems } from '../../hooks/useItems.tsx'
import './SingleItem.css'
import '../../App.css'
import './singleItemPane.css'
import '../../components/Button.css'
import Loading from '../../components/Loading.tsx'
import ObjectDisplay from '../../components/ObjectDisplay.tsx'
import Button from '../../components/Button.tsx'

const DeleteItemConfirm = () => {
  const { singleItem, getItemByIdError } = useItems()

  const handleConfirmDelete = async () => {
    console.log('delete confirmed')
  }

  const HandleHoverStart = async () => {
    console.log('hover start')
  }

  const handleHoverEnd = async () => {
    console.log('hover end')
  }

  return (
    <div id="delete-confiorm-container">
      {getItemByIdError ? (
        <pre className="error-message">{getItemByIdError}</pre>
      ) : singleItem && !Array.isArray(singleItem) ? (
        <div className="single-item-display-container">
          {/*<div className={`status-label ${singleItemStatus.statusType}`}>*/}
          {/*  {singleItemStatus.status}*/}
          {/*</div>*/}
          <div className="confirm-delete-btn-container">
            <Button
              id={`confirm-delete-item`}
              ariaLabel={`confirm delete item`}
              onClick={handleConfirmDelete}
              onMouseEnter={HandleHoverStart}
              onMouseLeave={handleHoverEnd}
              className={`btn confirm-delete-btn`}
            >
              Are you sure you want to permanently delete this item?
            </Button>
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

export default DeleteItemConfirm
