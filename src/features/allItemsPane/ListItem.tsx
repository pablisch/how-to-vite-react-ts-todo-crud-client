import { IsHoveredObject, UnknownObject } from '../../types/types.ts'
import Button from '../../components/Button.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import './ListItem.css'
import { useItems } from '../../hooks/useItems.tsx'
import { useState } from 'react'

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
  const [isHovered, setHovered] = useState<IsHoveredObject>(
    defaultIsHoveredSettings
  )
  const { idParams, handleSetIdParams, handleResetIdParams } = useIdParams()
  const { handleResetOperation, deleteItem, loadUpdateForm, operation } =
    useItems()

  const processItem = (item: UnknownObject) => {
    const keys = Object.keys(item)

    const idKey = keys.find(key => key === 'id' || key === '_id')
    const idValue = idKey
      ? item[idKey]
      : 'WARNING: This item has no ID property'
    const nameKey = keys.find(
      key => key === 'name' || key === 'firstName' || key === 'fName'
    )
    const lastNameKey = keys.find(key => key === 'lName' || key === 'lastName')

    // Remove id/_id and name keys from the rest
    const otherKeys = keys.filter(
      key => key !== idKey && key !== nameKey && key !== lastNameKey
    )

    // Merge properties in desired order: id/_id -> name -> first 3 of others
    return [
      ...(idKey ? [[idKey, idValue]] : [['id', idValue]]), // Use 'id' for warning message if no idKey is found
      ...(nameKey ? [[nameKey, item[nameKey]]] : []),
      ...(lastNameKey ? [[lastNameKey, item[lastNameKey]]] : []),
      ...otherKeys.map(key => [key, item[key]]), // Limit to the first 2 remaining keys
    ].slice(0, 3)
  }

  const displayItem = processItem(item)
  const id = displayItem[0][1]
  const isFocussed = `/${id}` === idParams
  const isViewed = `/${id}` === idParams && operation === 'getById'
  const isPatched = `/${id}` === idParams && operation === 'update'

  const handleViewItem = async () => {
    if (isViewed) {
      handleResetIdParams()
    } else {
      handleSetIdParams(id)
      handleResetOperation()
    }
  }

  const handleDeleteItem = async () => {
    if (isViewed) {
      handleResetIdParams()
    }
    await deleteItem(id)
  }

  const handleChooseUpdate = async () => {
    if (isPatched) {
      handleResetIdParams()
      handleResetOperation()
    } else {
      handleSetIdParams(id)
      loadUpdateForm(id)
    }
  }

  const handleItemHoverStart = () => {
    setHovered(prev => ({ ...prev, item: true }))
  }

  const handleItemHoverEnd = () => {
    setHovered(prev => ({ ...prev, item: false }))
  }

  const handleViewHoverStart = () => {
    setHovered(prev => ({ ...prev, view: true }))
  }

  const handleViewHoverEnd = () => {
    setHovered(prev => ({ ...prev, view: false }))
  }

  const handleDeleteHoverStart = () => {
    setHovered(prev => ({ ...prev, delete: true }))
  }

  const handleDeleteHoverEnd = () => {
    setHovered(prev => ({ ...prev, delete: false }))
  }

  const handleUpdateHoverStart = () => {
    setHovered(prev => ({ ...prev, update: true }))
  }

  const handleUpdateHoverEnd = () => {
    setHovered(prev => ({ ...prev, update: false }))
  }

  return (
    <div
      className={`item-panel ${isFocussed ? 'focus-item-panel' : ''} ${isHovered.item && !isFocussed ? 'hover-item-panel' : ''}`}
      onMouseEnter={handleItemHoverStart}
      onMouseLeave={handleItemHoverEnd}
    >
      <div className="item-details">
        {displayItem.map(([key, value]) => (
          <p key={key}>
            <strong>{key}:</strong> {String(value)}
          </p>
        ))}
      </div>
      <div className="item-btns">
        <Button
          ariaLabel="view item button"
          id={`view-item-id-${id}`}
          onClick={handleViewItem}
          onMouseEnter={handleViewHoverStart}
          onMouseLeave={handleViewHoverEnd}
          className={`btn ${!isFocussed ? 'inactive-btn' : ''} ${isViewed && operation === 'getById' ? 'active-btn' : ''} ${isHovered.view && !isFocussed ? 'hover-item-view-btn' : ''}`}
        >
          {isViewed ? 'Deselect' : 'View'}
        </Button>
        <Button
          ariaLabel="delete item button"
          id={`delete-item-id-${id}`}
          onClick={handleDeleteItem}
          onMouseEnter={handleDeleteHoverStart}
          onMouseLeave={handleDeleteHoverEnd}
          className={`btn bottom-btn red-btn ${!isFocussed ? 'inactive-btn' : ''} ${isHovered.delete && !isFocussed ? 'hover-item-view-btn' : ''}`}
        >
          Delete
        </Button>
        <Button
          ariaLabel="update item button"
          id={`update-item-id-${id}`}
          onClick={handleChooseUpdate}
          onMouseEnter={handleUpdateHoverStart}
          onMouseLeave={handleUpdateHoverEnd}
          className={`btn bottom-btn action-btn ${isPatched ? 'active-btn' : ''} ${!isFocussed ? 'inactive-btn' : ''} ${isHovered.update && !isFocussed ? 'hover-item-view-btn' : ''}`}
        >
          {isPatched ? 'Cancel update' : 'Update'}
        </Button>
      </div>
    </div>
  )
}

export default ListItem
