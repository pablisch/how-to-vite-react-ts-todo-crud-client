import React from 'react'
import { UnknownObject } from '../../types/types.ts'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useItems } from '../../hooks/useItems.tsx'
import './SingleItem.css'
import '../../App.css'
import Button from '../../components/Button.tsx'

const UpdateItemForm = () => {
  const { idParams } = useIdParams()
  const {
    itemToUpdate,
    updateItemError,
    isPatchUpdate,
    handlePerformUpdate,
    toggleUpdateType,
  } = useItems()

  const updateFormBtns = (
    <div className="update-form-btns">
      <Button
        ariaLabel={`${isPatchUpdate ? 'patch' : 'put'} update item with id ${idParams}`}
        id="perform-update-btn"
        className={`btn update-btn ${isPatchUpdate ? 'update-patch-btn-focus' : 'update-put-btn-focus'}`}
        onClick={handlePerformUpdate}
      >
        {`Perform ${isPatchUpdate ? 'PATCH' : 'PUT'} update`}
      </Button>
      <Button
        ariaLabel={`switch to ${isPatchUpdate ? 'patch' : 'put'} update`}
        id="toggle-update-type-btn"
        className={`btn update-btn ${isPatchUpdate ? 'update-put-btn-focus' : 'update-patch-btn-focus'}`}
        onClick={toggleUpdateType}
      >
        {`Switch to ${isPatchUpdate ? 'PUT' : 'PATCH'} operation`}
      </Button>
    </div>
  )

  return (
    <div id="single-item-operation-container">
      {updateItemError ? (
        <pre className="error-message">{updateItemError}</pre>
      ) : !idParams ? (
        <p>Set URL /:id parameter to get an item by ID</p>
      ) : itemToUpdate && !Array.isArray(itemToUpdate) ? (
        <div className="fixed-height-display-container">
          {updateFormBtns}
          {formatObjectAsJSX(itemToUpdate)}
          {/*{updateFormBtns}*/}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  )

  // Function to format object as JSX with bold keys
  function formatObjectAsJSX(obj: UnknownObject): React.ReactNode {
    if (typeof obj !== 'object' || obj === null) {
      return <span>{String(obj)}</span> // Return the value itself if it's not an object
    }

    return (
      <>
        <ul className="single-item-details">
          {Object.entries(obj).map(([key, value]) => (
            <li key={key}>
              <strong>{key}</strong>:{' '}
              {typeof value === 'object' && value !== null ? (
                formatObjectAsJSX(value) // Recursively render nested objects
              ) : (
                <span>{String(value)}</span>
              )}
            </li>
          ))}
        </ul>
      </>
    )
  }
}

export default UpdateItemForm
