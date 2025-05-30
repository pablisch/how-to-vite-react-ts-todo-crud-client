import { useItems } from '../../hooks/useItems.tsx'
import './OperationIndicator.css'
import '../allItemsPane/ListItem.css'
import OperationIndicator from './OperationIndicator.tsx'
import { useOperation } from '../../hooks/useOperation.tsx'
import { useSettings } from '../../hooks/useSettings.tsx'

const OperationIndicatorPanel = () => {
  const { operation } = useOperation()
  const { isPatchUpdate } = useItems()
  const { settings } = useSettings()

  const patchFocus = operation === 'update' && isPatchUpdate
  const putFocus = operation === 'update' && !isPatchUpdate

  return (
    <div className="operation-indicator-container">
      <OperationIndicator
        id={`get-by-id-operation-indicator`}
        ariaLabel={`get by id operation indicator`}
        classNames={[
          'operation',
          'operation-btn-font',
          ...(operation === 'getById'
            ? ['active-operation', 'active-get-by-id-op']
            : []),
        ]}
        hoverClass={
          operation === 'getById'
            ? ['hover-get-by-id-op', 'active-op-indicator-hover']
            : ['get-by-id-op-inactive-hover', 'inactive-op-indicator-hover']
        }
      >
        GET items/:id
      </OperationIndicator>
      <OperationIndicator
        id={`post-operation-indicator`}
        ariaLabel={`post operation indicator`}
        classNames={[
          'operation',
          'operation-btn-font',
          ...(operation === 'create'
            ? ['active-operation', 'active-post-op']
            : []),
        ]}
        hoverClass={
          operation === 'create'
            ? ['hover-post-op', 'active-op-indicator-hover']
            : ['post-op-inactive-hover', 'inactive-op-indicator-hover']
        }
      >
        POST items
      </OperationIndicator>
      <OperationIndicator
        id={`put-operation-indicator`}
        ariaLabel={`put operation indicator`}
        classNames={[
          'operation',
          'operation-btn-font',
          ...(putFocus ? ['active-operation', 'active-put-op'] : []),
        ]}
        hoverClass={
          putFocus
            ? ['hover-put-op', 'active-op-indicator-hover']
            : ['put-op-inactive-hover', 'inactive-op-indicator-hover']
        }
      >
        PUT items/:id
      </OperationIndicator>
      <OperationIndicator
        id={`patch-operation-indicator`}
        ariaLabel={`patch operation indicator`}
        classNames={[
          'operation',
          'operation-btn-font',
          ...(patchFocus ? ['active-operation', 'active-patch-op'] : []),
        ]}
        hoverClass={
          patchFocus
            ? ['hover-patch-op', 'active-op-indicator-hover']
            : ['patch-op-inactive-hover', 'inactive-op-indicator-hover']
        }
      >
        PATCH items/:id
      </OperationIndicator>
      <OperationIndicator
        id={`delete-operation-indicator`}
        ariaLabel={`delete operation indicator`}
        classNames={[
          'operation',
          'operation-btn-font',
          settings.theme === 'dark' ? 'operation-btn-font-thicker' : '',
          ...(operation === 'delete'
            ? ['active-operation', 'active-delete-op']
            : []),
        ]}
        hoverClass={
          operation === 'delete'
            ? ['hover-delete-op', 'active-op-indicator-hover']
            : ['delete-op-inactive-hover', 'inactive-op-indicator-hover']
        }
      >
        DELETE items
      </OperationIndicator>
    </div>
  )
}

export default OperationIndicatorPanel
