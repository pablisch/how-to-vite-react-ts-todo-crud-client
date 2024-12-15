import React, { useEffect, useState } from 'react'
import { useUrlParams } from '../hooks/useUrlParams.tsx'
import '../css/UrlParamsForm.css'

const UrlQueryParamsForm = () => {
  const { params, handleSetParams, handleResetParams } = useUrlParams()
  const [inputValue, setInputValue] = useState<string>(params)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    setInputValue(params)
  }, [params])

  return (
    <div id="url-params-form" className="flex-container">
      <h1 id="url-params-title">URL /:id params:</h1>
      <input
        id="url-params-input"
        className="url-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter new URL params"
      />
      <div className="base-url-btn-container">
        <button
          className={`url-params-btn url-btn`}
          // disabled={baseUrl === inputValue}
          onClick={() => handleSetParams(inputValue)}
        >
          Set URL /:id param
        </button>
        <button
          className={`url-params-btn url-btn`}
          // disabled={isDefaultUrlValue}
          onClick={handleResetParams}
        >
          Reset params
        </button>
      </div>
    </div>
  )
}

export default UrlQueryParamsForm
