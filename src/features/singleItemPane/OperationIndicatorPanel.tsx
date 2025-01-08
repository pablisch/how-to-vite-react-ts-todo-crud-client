import { useItems } from '../../hooks/useItems.tsx'
import './OperationIndicator.css'
import '../allItemsPane/ListItem.css'
import OperationIndicator from './OperationIndicator.tsx'

const OperationIndicatorPanel = () => {
  const { operation, isPatchUpdate } = useItems()
  
  const patchFocus = operation === 'update' && isPatchUpdate
  const putFocus = operation === 'update' && !isPatchUpdate

  return (
    <div className="operation-indicator-container">
      <OperationIndicator
        id={`get-by-id-operation-indicator`}
        ariaLabel={`get by id operation indicator`}
        classNames={[
          'operation',
          ...(operation === 'getById'
            ? ['active-operation', 'active-get-by-id']
            : []),
        ]}
        hoverClass={operation === 'getById' ? 'get-by-id-op-hover' : 'get-by-id-op-mute'}
      >
        GET items/:id
      </OperationIndicator>
      <OperationIndicator
        id={`post-operation-indicator`}
        ariaLabel={`post operation indicator`}
        classNames={[
          'operation',
          ...(operation === 'create'
            ? ['active-operation', 'active-post']
            : []),
        ]}
        hoverClass={operation === 'create' ? 'post-op-hover' : 'post-op-mute'}
      >
        POST items
      </OperationIndicator>
      <OperationIndicator
        id={`delete-operation-indicator`}
        ariaLabel={`delete operation indicator`}
        classNames={[
          'operation',
          ...(operation === 'delete'
            ? ['active-operation', 'active-delete']
            : []),
        ]}
        hoverClass={operation === 'delete' ? 'delete-op-hover' : 'delete-op-mute'}
      >
        DELETE items
      </OperationIndicator>
      <OperationIndicator
        id={`patch-operation-indicator`}
        ariaLabel={`patch operation indicator`}
        classNames={[
          'operation',
          ...(patchFocus
            ? ['active-operation', 'active-patch']
            : []),
        ]}
        hoverClass={patchFocus ? 'patch-op-hover' : 'patch-op-mute'}
      >
        PATCH items/:id
      </OperationIndicator>
      <OperationIndicator
        id={`put-operation-indicator`}
        ariaLabel={`put operation indicator`}
        classNames={[
          'operation',
          ...(putFocus ? ['active-operation', 'active-put'] : []),
        ]}
        hoverClass={putFocus ? 'put-op-hover' : 'put-op-mute'}
      >
        PUT items/:id
      </OperationIndicator>
    </div>
  )
}

export default OperationIndicatorPanel
