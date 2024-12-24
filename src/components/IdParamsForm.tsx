import React, { useEffect, useState } from 'react'
import { useIdParams } from '../hooks/useIdParams.tsx'

const IdParamsForm = () => {
  const { idParams, handleSetIdParams, handleResetIdParams } = useIdParams()
  const [inputValue, setInputValue] = useState<string>(idParams)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    setInputValue(idParams)
  }, [idParams])

  return (
    <div id="url-id-param-form" className="url-form">
      <h1 id="url-id-param-title" className="url-form-title">URL /:id params:</h1>
      <input
        id="url-id-param-input"
        className="url-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter new URL /:id param"
      />
      <div className="url-btn-container">
        <button
          className={`url-id-param-btn url-btn`}
          // disabled={baseUrl === inputValue}
          onClick={() => handleSetIdParams(inputValue)}
        >
          Set /:id param
        </button>
        <button
          className={`url-idParam-btn url-btn`}
          // disabled={isDefaultUrlValue}
          onClick={handleResetIdParams}
        >
          Reset /:id Params
        </button>
      </div>
    </div>
  )
}

export default IdParamsForm
