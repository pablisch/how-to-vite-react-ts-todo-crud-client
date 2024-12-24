import React, { useEffect, useState } from 'react'
import { useQueryParams } from '../hooks/useQueryParams.tsx'

const QueryParamsForm = () => {
  const { queryParams, handleSetQueryParams, handleResetQueryParams } =
    useQueryParams()
  const [inputValue, setInputValue] = useState<string>(queryParams)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    setInputValue(queryParams)
  }, [queryParams])

  return (
    <div id="url-query-params-form" className="url-form">
      <h1 id="url-query-params-title" className="url-form-title">
        URL query params:
      </h1>
      <input
        id="url-query-params-input"
        className="url-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter new URL query params"
      />
      <div className="url-btn-container">
        <button
          className={`url-query-params-btn url-btn`}
          // disabled={baseUrl === inputValue}
          onClick={() => handleSetQueryParams(inputValue)}
        >
          Set query param
        </button>
        <button
          className={`url-query-params-btn url-btn`}
          // disabled={isDefaultUrlValue}
          onClick={handleResetQueryParams}
        >
          Reset query params
        </button>
      </div>
    </div>
  )
}

export default QueryParamsForm
