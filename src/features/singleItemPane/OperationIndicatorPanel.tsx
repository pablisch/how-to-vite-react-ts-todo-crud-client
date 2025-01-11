import { useItems } from '../../hooks/useItems.tsx'
import './OperationIndicator.css'
import '../allItemsPane/ListItem.css'
import OperationIndicator from './OperationIndicator.tsx'
import { useOperation } from '../../hooks/useOperation.tsx'

const OperationIndicatorPanel = () => {
  const { operation } = useOperation()
  const { isPatchUpdate } = useItems()

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
        hoverClass={
          operation === 'getById'
            ? ['get-by-id-op-hover', 'op-indicator-hover']
            : ['get-by-id-op-mute', 'op-indicator-mute']
        }
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
        hoverClass={
          operation === 'create'
            ? ['post-op-hover', 'op-indicator-hover']
            : ['post-op-mute', 'op-indicator-mute']
        }
      >
        POST items
      </OperationIndicator>
      <OperationIndicator
        id={`put-operation-indicator`}
        ariaLabel={`put operation indicator`}
        classNames={[
          'operation',
          ...(putFocus ? ['active-operation', 'active-put'] : []),
        ]}
        hoverClass={
          putFocus
            ? ['put-op-hover', 'op-indicator-hover']
            : ['put-op-mute', 'op-indicator-mute']
        }
      >
        PUT items/:id
      </OperationIndicator>
      <OperationIndicator
        id={`patch-operation-indicator`}
        ariaLabel={`patch operation indicator`}
        classNames={[
          'operation',
          ...(patchFocus ? ['active-operation', 'active-patch'] : []),
        ]}
        hoverClass={
          patchFocus
            ? ['patch-op-hover', 'op-indicator-hover']
            : ['patch-op-mute', 'op-indicator-mute']
        }
      >
        PATCH items/:id
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
        hoverClass={
          operation === 'delete'
            ? ['delete-op-hover', 'op-indicator-hover']
            : ['delete-op-mute', 'op-indicator-mute']
        }
      >
        DELETE items
      </OperationIndicator>
    </div>
  )
}

export default OperationIndicatorPanel
