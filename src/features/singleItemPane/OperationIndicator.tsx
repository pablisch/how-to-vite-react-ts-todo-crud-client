import { useItems } from '../../hooks/useItems.tsx'
import './OperationIndicator.css'

const OperationIndicator = () => {
  const { operation, isPatchUpdate } = useItems()

  return (
    <div className="operation-indicator-container">
      <div
        className={`operation ${operation === 'getById' ? 'active-operation' : ''}`}
      >
        GET items/:id
      </div>
      <div
        className={`operation ${operation === 'create' ? 'active-operation' : ''}`}
      >
        POST items
      </div>
      <div
        className={`operation ${operation === 'delete' ? 'active-operation' : ''}`}
      >
        DELETE items
      </div>
      <div
        className={`operation ${operation === 'update' && isPatchUpdate ? 'active-operation' : ''}`}
      >
        PATCH items/:id
      </div>
      <div
        className={`operation ${operation === 'update' && !isPatchUpdate ? 'active-operation' : ''}`}
      >
        PUT items/:id
      </div>
    </div>
  )
}

export default OperationIndicator
