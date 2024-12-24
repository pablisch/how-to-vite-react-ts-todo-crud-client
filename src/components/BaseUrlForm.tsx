import React, { useEffect, useState } from 'react'
import '../css/BaseUrlForm.css'
import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import Button from './Button.tsx'

function BaseUrlFrom() {
  const {
    baseUrl,
    isLocalApi,
    isDefaultUrlValue,
    handleSetBaseUrl,
    handleResetBaseUrl,
    handleToggleApiLocation,
  } = useBaseUrl()
  const [inputValue, setInputValue] = useState<string>(baseUrl)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleResetBaseUrlAndInputValue = () => {
    handleResetBaseUrl()
  }

  const handleToggleApiLocalDeployed = () => {
    handleToggleApiLocation()
  }

  useEffect(() => {
    setInputValue(baseUrl)
  }, [baseUrl])

  return (
    // <div id="url-form">
    <div id="base-url-form" className="url-form">
      <h1 id="base-url-title" className="url-form-title">Base URL:</h1>
      <input
        id="base-url-input"
        className="url-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter new base URL"
      />
      <div className="url-btn-container">
        <Button
          ariaLabel="view item button"
          id={`set-api-base-url`}
          onClick={() => handleSetBaseUrl(inputValue)}
          disabled={inputValue === baseUrl}
          className={`btn url-btn ${isLocalApi ? 'local' : 'deployed'} ${inputValue === baseUrl ? 'disabled' : ''}`}
        >
          {`Set ${isLocalApi ? 'localhost' : 'remote'} base URL`}
        </Button>
        <Button
          ariaLabel="view item button"
          id={`reset-api-base-url`}
          className={`btn url-btn ${isLocalApi ? 'local' : 'deployed'} ${isDefaultUrlValue ? 'disabled' : ''}`}
          disabled={isDefaultUrlValue}
          onClick={handleResetBaseUrlAndInputValue}
        >
          {`Reset ${isLocalApi ? 'localhost' : 'remote'} base URL`}
        </Button>
        <Button
          ariaLabel="view item button"
          id={`set-api-location`}
          className={`btn url-btn ${isLocalApi ? 'deployed' : 'local'}`}
          onClick={handleToggleApiLocalDeployed}
        >
          {isLocalApi ? 'Use deployed API' : 'Use local API'}
        </Button>
      </div>
    </div>
  )
}

export default BaseUrlFrom
