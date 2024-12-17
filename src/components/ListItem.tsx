import { UnknownObject } from '../types/types.ts'
import Button from './Button.tsx'
import { useIdParams } from '../hooks/useIdParams.tsx'

interface ListItemProps {
  item: UnknownObject
}
const ListItem = ({ item }: ListItemProps) => {
  const { idParams, handleSetIdParams, handleResetIdParams } = useIdParams()

  console.log('item:', item)
  // const {_id, ...rest} = item
  // console.log('rest:', rest)

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
  console.log('displayItem:', displayItem)
  console.log('id:', id)
  
  const isViewed = `/${id}` === idParams

  const handleViewItem = () => {
    console.log('isViewed:', isViewed, 'id:', id, 'idParams:', idParams)
    if (isViewed) {
      handleResetIdParams()
    } else {
      console.log('view item:', id)
      handleSetIdParams(id)
    }
  }

  return (
    <div className="item-panel">
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
          className={`btn ${isViewed ? 'deselect' : ''}`}
        >
          {isViewed ? 'Deselect' : 'View item'}
        </Button>
      </div>
    </div>
  )
}

export default ListItem
