import { useEffect, useState } from 'react'
import '../css/BaseUrlForm.css'
import { useBaseUrl } from '../hooks/useBaseUrl.tsx'

function BaseUrlFrom() {
  const {
    baseUrl,
    isLocalApi,
    isDefaultUrlValue,
    handleSetBaseUrl,
    handleResetBaseUrl,
    handleToggleApiLocation,
  } = useBaseUrl()
  const [inputValue, setInputValue] = useState(baseUrl)

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
    <div id="base-url-form">
      <h1 id='base-url-title'>Base URL</h1>
      <input
        id="base-url-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter new base URL"
      />
      <div className="base-url-btn-container">
        <button
          className={`base-url-btns ${isLocalApi ? 'local' : 'deployed'}`}
          disabled={baseUrl === inputValue}
          onClick={() => handleSetBaseUrl(inputValue)}
        >{`Set ${isLocalApi ? 'localhost' : 'remote'} base URL`}</button>
        <button
          className={`base-url-btns ${isLocalApi ? 'local' : 'deployed'}`}
          disabled={isDefaultUrlValue}
          onClick={handleResetBaseUrlAndInputValue}
        >{`Reset ${isLocalApi ? 'localhost' : 'remote'} base URL`}</button>
        <button
          className={`base-url-btns ${isLocalApi ? 'deployed' : 'local'}`}
          onClick={handleToggleApiLocalDeployed}
        >
          {isLocalApi ? 'Use deployed API' : 'Use local API'}
        </button>
      </div>
    </div>
  )
}

export default BaseUrlFrom
