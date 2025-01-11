import { IsHoveredObject, UnknownObject } from '../../types/types.ts'
import Button from '../../components/Button.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import './ListItem.css'
import { useItems } from '../../hooks/useItems.tsx'
import { useState } from 'react'
import helpers from '../../utils/helpers.tsx'
import classHelpers from '../../utils/classHelpers.ts'

const defaultIsHoveredSettings: IsHoveredObject = {
  item: false,
  view: false,
  create: false,
  delete: false,
  update: false,
}

interface ListItemProps {
  item: UnknownObject
}
const ListItem = ({ item }: ListItemProps) => {
  const [isHovered, setIsHovered] = useState<IsHoveredObject>(
    defaultIsHoveredSettings
  )
  const { idParams, handleSetIdParams, handleResetIdParams } = useIdParams()
  const {
    handleResetOperation,
    startDeleteItem,
    loadUpdateForm,
    operation,
    setOperation,
    isPatchUpdate,
    setItemId,
  } = useItems()

  const formattedItem = helpers.processListItemForDisplay(item)
  const id = formattedItem[0][1]
  const isFocussed = `/${id}` === idParams
  const viewActive = isFocussed && operation === 'getById'
  const updateActive = isFocussed && operation === 'update'
  const deleteActive = isFocussed && operation === 'delete'

  const handleToggleViewItem = async () => {
    if (viewActive) {
      handleResetIdParams()
    } else {
      handleSetIdParams(id)
      handleResetOperation()
    }
  }

  const handleDeleteItem = async () => {
    if (deleteActive) {
      handleResetIdParams()
      setOperation('getById')
    }
    setItemId(id)
    await startDeleteItem(id)
  }

  const handleChooseUpdate = async () => {
    if (updateActive) {
      handleResetIdParams()
      handleResetOperation()
    } else {
      handleSetIdParams(id)
      loadUpdateForm(id)
    }
  }

  const handleItemHoverStart = () => {
    setIsHovered(prev => ({ ...prev, item: true }))
  }

  const handleItemHoverEnd = () => {
    setIsHovered(prev => ({ ...prev, item: false }))
  }

  const handleViewHoverStart = () => {
    setIsHovered(prev => ({ ...prev, view: true }))
  }

  const handleViewHoverEnd = () => {
    setIsHovered(prev => ({ ...prev, view: false }))
  }

  const handleDeleteHoverStart = () => {
    setIsHovered(prev => ({ ...prev, delete: true }))
  }

  const handleDeleteHoverEnd = () => {
    setIsHovered(prev => ({ ...prev, delete: false }))
  }

  const handleUpdateHoverStart = () => {
    setIsHovered(prev => ({ ...prev, update: true }))
  }

  const handleUpdateHoverEnd = () => {
    setIsHovered(prev => ({ ...prev, update: false }))
  }

  const classes = classHelpers.getClassNamesForListItems(
    isFocussed,
    isHovered,
    isPatchUpdate
  )

  return (
    <div
      className={[...classes.item].join(' ')}
      onMouseEnter={handleItemHoverStart}
      onMouseLeave={handleItemHoverEnd}
    >
      <div className="item-details">
        {formattedItem.map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {String(value)}
          </p>
        ))}
      </div>
      <div className="item-btns">
        <Button
          ariaLabel="view item button"
          id={`view-item-id-${id}`}
          onClick={handleToggleViewItem}
          onMouseEnter={handleViewHoverStart}
          onMouseLeave={handleViewHoverEnd}
          className={[...classes.view].join(' ')}
        >
          {viewActive ? 'Deselect' : 'View'}
        </Button>
        <Button
          ariaLabel="update item button"
          id={`update-item-id-${id}`}
          onClick={handleChooseUpdate}
          onMouseEnter={handleUpdateHoverStart}
          onMouseLeave={handleUpdateHoverEnd}
          className={[...classes.update].join(' ')}
        >
          {updateActive ? 'Cancel' : 'Update'}
        </Button>
        <Button
          ariaLabel="delete item button"
          id={`delete-item-id-${id}`}
          onClick={handleDeleteItem}
          onMouseEnter={handleDeleteHoverStart}
          onMouseLeave={handleDeleteHoverEnd}
          className={[...classes.delete].join(' ')}
        >
          {deleteActive ? 'Cancel' : 'Delete'}
        </Button>
      </div>
    </div>
  )
}

export default ListItem
