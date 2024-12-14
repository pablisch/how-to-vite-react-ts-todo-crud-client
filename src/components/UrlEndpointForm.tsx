import React, { useEffect, useState } from 'react'
import { useEndpoint } from '../hooks/useEndpoint.tsx'

const UrlEndpointForm = () => {
  const { endpoint, handleSetEndpoint, handleResetEndpoint } = useEndpoint()
  const [inputValue, setInputValue] = useState<string>(endpoint)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  useEffect(() => {
    setInputValue(endpoint)
  }, [endpoint])

  return (
    <div id="url-endpoint-form" className="flex-container">
      <h1 id="url-endpoint-title">URL endpoint:</h1>
      <input
        id="url-endpoint-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter new URL endpoint"
      />
      <div className="base-url-btn-container">
        <button
          className={`url-endpoint-btn`}
          // disabled={baseUrl === inputValue}
          onClick={() => handleSetEndpoint(inputValue)}
        >
          Set URL endpoint
        </button>
        <button
          className={`url-endpoint-btn`}
          // disabled={isDefaultUrlValue}
          onClick={handleResetEndpoint}
        >
          Reset endpoint
        </button>
      </div>
    </div>
  )
}

export default UrlEndpointForm
