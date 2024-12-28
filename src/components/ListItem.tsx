import { UnknownObject } from '../types/types.ts'
import Button from './Button.tsx'
import { useIdParams } from '../hooks/useIdParams.tsx'
import '../css/ListItem.css'
import { useItems } from '../hooks/useItems.tsx'

interface ListItemProps {
  item: UnknownObject
}
const ListItem = ({ item }: ListItemProps) => {
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

  return (
    <div className={`item-panel ${isFocussed ? 'focus-item-panel' : ''}`}>
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
          className={`btn ${isViewed && operation === 'getById' ? 'active-btn' : ''}`}
        >
          {isViewed ? 'Deselect' : 'View item'}
        </Button>
        <Button
          ariaLabel="delete item button"
          id={`delete-item-id-${id}`}
          onClick={handleDeleteItem}
          className="btn bottom-btn red-btn"
        >
          {/*{isViewed ? 'Deselect' : 'View item'}*/}
          Delete item
        </Button>
        <Button
          ariaLabel="update item button"
          id={`update-item-id-${id}`}
          onClick={handleChooseUpdate}
          className={`btn bottom-btn action-btn ${isPatched ? 'active-btn' : ''}`}
        >
          {isPatched ? 'Cancel update' : 'Configure update'}
        </Button>
      </div>
    </div>
  )
}

export default ListItem
