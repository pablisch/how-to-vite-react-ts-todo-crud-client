import { useItems } from '../../hooks/useItems.tsx'
import Loading from '../../components/Loading.tsx'
import ObjectDisplay from '../../components/ObjectDisplay.tsx'
import Button from '../../components/Button.tsx'
import { useState } from 'react'
import './SingleItem.css'
import '../../App.css'
import './singleItemPane.css'
const defaultClasses: string = `btn confirm-delete-btn`

const DeleteItemConfirm = () => {
  const [btnClasses, setBtnClasses] = useState<string>(defaultClasses)
  const { singleItem, getItemByIdError, deleteItem, itemId } = useItems()

  const handleConfirmDelete = async () => {
    console.log('delete confirmed')
    if (itemId) deleteItem(itemId)
  }

  const HandleHoverStart = async () => {
    console.log('hover start')
    setBtnClasses('btn confirm-delete-btn confirm-delete-btn-hover')
  }

  const handleHoverEnd = async () => {
    console.log('hover end')
    setBtnClasses(defaultClasses)
  }

  return (
    <div id="delete-confiorm-container">
      {getItemByIdError ? (
        <pre className="error-message">{getItemByIdError}</pre>
      ) : singleItem && !Array.isArray(singleItem) ? (
        <div className="fixed-height-display-container">
          <div className="confirm-delete-btn-container">
            <Button
              id={`confirm-delete-item`}
              ariaLabel={`confirm delete item`}
              onClick={handleConfirmDelete}
              onMouseEnter={HandleHoverStart}
              onMouseLeave={handleHoverEnd}
              className={btnClasses}
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
