import DeleteResponse from './DeleteResponse.tsx'
// import { useState } from 'react'
import DeleteItemConfirm from './DeleteItemConfirm.tsx'
import { useItems } from '../../hooks/useItems.tsx'

const DeleteController = () => {
  // const [deleted, setDeleted] = useState<boolean>(false)
  const { itemId } = useItems()

  return <>{itemId ? <DeleteItemConfirm /> : <DeleteResponse />}</>
}

export default DeleteController
