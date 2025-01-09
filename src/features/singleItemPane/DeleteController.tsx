import DeleteResponse from './DeleteResponse.tsx'
import { useState } from 'react'
import DeleteItemConfirm from './DeleteItemConfirm.tsx'

const DeleteController = () => {
  const [deleted, setDeleted] = useState<boolean>(false)

  return <>{!deleted ? <DeleteItemConfirm /> : <DeleteResponse />}</>
}

export default DeleteController
