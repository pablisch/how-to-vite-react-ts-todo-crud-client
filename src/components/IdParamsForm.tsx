import React, { useEffect, useState } from 'react'
import { useIdParams } from '../hooks/useIdParams.tsx'
import '../css/QueryParamsForm.css'

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
    <div id="url-id-param-form" className="flex-container">
      <h1 id="url-id-param-title">URL /:id params:</h1>
      <input
        id="url-id-param-input"
        className="url-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter new URL /:id param"
      />
      <div className="base-url-btn-container">
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
