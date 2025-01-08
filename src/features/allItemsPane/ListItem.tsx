import {
  IsHoveredObject,
  itemClassesObject,
  UnknownObject,
} from '../../types/types.ts'
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

const defaultClasses: itemClassesObject = {
  item: ['item-panel'],
  view: ['btn', 'item-btn', 'inactive-item-btn'],
  create: ['btn', 'item-btn', 'btn-space-above', 'inactive-item-btn'],
  update: ['btn', 'item-btn', 'btn-space-above', 'inactive-item-btn'],
  delete: ['btn', 'item-btn', 'btn-space-above', 'inactive-item-btn'],
}

interface ListItemProps {
  item: UnknownObject
}
const ListItem = ({ item }: ListItemProps) => {
  const [isHovered, setIsHovered] = useState<IsHoveredObject>(
    defaultIsHoveredSettings
  )
  // const [classes, setClasses] = useState<itemClassesObject>(defaultClasses)
  const { idParams, handleSetIdParams, handleResetIdParams } = useIdParams()
  const {
    handleResetOperation,
    deleteItem,
    loadUpdateForm,
    operation,
    isPatchUpdate,
  } = useItems()

  // let classes: itemClassesObject = defaultClasses

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
  const viewActive = isFocussed && operation === 'getById'
  const updateActive = isFocussed && operation === 'update'

  const handleToggleViewItem = async () => {
    if (viewActive) {
      handleResetIdParams()
    } else {
      handleSetIdParams(id)
      handleResetOperation()
    }
  }

  const handleDeleteItem = async () => {
    if (viewActive) {
      handleResetIdParams()
    }
    await deleteItem(id)
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

  const classes = {
    item: [
      ...defaultClasses.item,
      isHovered.item ? 'item-panel-hover' : '',
      isFocussed ? 'item-panel-focus' : '',
    ],
    view: [
      ...defaultClasses.view,
      ...(isHovered.view ? ['view-btn-hover', 'hover'] : []),
      ...(isFocussed ? ['view-btn-focus', 'focus'] : []),
      ...(isFocussed && isHovered.view
        ? ['view-btn-focus-hover', 'btn-focus-hover']
        : []),
    ],
    create: [
      ...defaultClasses.create,
      ...(isHovered.create ? ['create-btn-hover', 'hover'] : []),
      ...(isFocussed ? ['create-btn-focus', 'focus'] : []),
      ...(isFocussed && isHovered.create
        ? ['create-btn-focus-hover', 'btn-focus-hover']
        : []),
    ],
    delete: [
      ...defaultClasses.delete,
      ...(isHovered.delete ? ['delete-btn-hover', 'hover'] : []),
      ...(isFocussed ? ['delete-btn-focus', 'focus'] : []),
      ...(isFocussed && isHovered.delete
        ? ['delete-btn-focus-hover', 'btn-focus-hover']
        : []),
    ],
    update: [
      ...defaultClasses.update,
      ...(isHovered.update
        ? isPatchUpdate
          ? ['update-patch-btn-hover', 'hover']
          : ['update-put-btn-hover', 'hover']
        : []),
      ...(isFocussed
        ? isPatchUpdate
          ? ['update-patch-btn-focus', 'focus']
          : ['update-put-btn-focus', 'focus']
        : []),
      ...(isFocussed && isHovered.update
        ? isPatchUpdate
          ? ['update-patch-btn-focus-hover', 'btn-focus-hover']
          : ['update-put-btn-focus-hover', 'btn-focus-hover']
        : []),
    ],
  }

  return (
    <div
      className={[...classes.item].join(' ')}
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
          Delete
        </Button>
      </div>
    </div>
  )
}

export default ListItem
