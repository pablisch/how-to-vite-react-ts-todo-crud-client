import { useItems } from '../../hooks/useItems.tsx'
import './OperationIndicator.css'

const OperationIndicator = () => {
  const { operation, isPatchUpdate } = useItems()

  return (
    <div className="operation-indicator-container">
      <div
        className={`operation ${operation === 'getById' ? 'active-operation active-get-by-id' : ''}`}
      >
        GET items/:id
      </div>
      <div
        className={`operation ${operation === 'create' ? 'active-operation active-post' : ''}`}
      >
        POST items
      </div>
      <div
        className={`operation ${operation === 'delete' ? 'active-operation active-delete' : ''}`}
      >
        DELETE items
      </div>
      <div
        className={`operation ${operation === 'update' && isPatchUpdate ? 'active-operation active-patch' : ''}`}
      >
        PATCH items/:id
      </div>
      <div
        className={`operation ${operation === 'update' && !isPatchUpdate ? 'active-operation active-put' : ''}`}
      >
        PUT items/:id
      </div>
    </div>
  )
}

export default OperationIndicator
