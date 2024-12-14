import { UnknownObject } from '../types/types.ts'

interface ListItemProps {
  item: UnknownObject
}
const ListItem = ({ item }: ListItemProps) => {
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
    const orderedItems = [
      ...(idKey ? [[idKey, idValue]] : [['id', idValue]]), // Use 'id' for warning message if no idKey is found
      ...(nameKey ? [[nameKey, item[nameKey]]] : []),
      ...(lastNameKey ? [[lastNameKey, item[lastNameKey]]] : []),
      ...otherKeys.slice(0, 2).map(key => [key, item[key]]), // Limit to the first 2 remaining keys
    ]

    return orderedItems
  }

  const displayItem = processItem(item)
  // console.log(displayItem)

  return (
    <div className="item-panel">
      {displayItem.map(([key, value]) => (
        <p key={key}>
          <strong>{key}:</strong> {String(value)}
        </p>
      ))}
    </div>
  )
}

export default ListItem
