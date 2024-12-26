import React, { useEffect, useState } from 'react'
import { useQueryParams } from '../hooks/useQueryParams.tsx'
import Button from './Button.tsx'

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
        <Button
          ariaLabel="set query params url section"
          id={`set-query-params-url`}
          className={`btn url-btn`}
          // disabled={isDefaultUrlValue}
          onClick={() => handleSetQueryParams(inputValue)}
        >
          {`Set query param`}
        </Button>
        <Button
          ariaLabel="reset query params url section"
          id={`reset-query-params-url`}
          className={`btn url-btn`}
          // disabled={isDefaultUrlValue}
          onClick={handleResetQueryParams}
        >
          {`Reset query param`}
        </Button>
      </div>
    </div>
  )
}

export default QueryParamsForm
