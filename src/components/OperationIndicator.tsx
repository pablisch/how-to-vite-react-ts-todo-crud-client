import React from 'react'
import { useItems } from '../hooks/useItems.tsx'
import '../css/OperationIndicator.css'

const OperationIndicator = () => {
  const { operation } = useItems()

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
        className={`operation ${operation === 'patchUpdate' ? 'active-operation' : ''}`}
      >
        PATCH items/:id
      </div>
      <div
        className={`operation ${operation === 'putUpdate' ? 'active-operation' : ''}`}
      >
        PUT items/:id
      </div>
    </div>
  )
}

export default OperationIndicator
