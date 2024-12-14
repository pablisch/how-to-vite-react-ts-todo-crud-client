import { useState } from 'react'
import '../css/BaseUrlForm.css'
import { useBaseUrl } from '../hooks/useBaseUrl.tsx'

function BaseUrlFrom() {
  const {
    baseUrl,
    defaultBaseUrl,
    isLocalApi,
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
    setInputValue(defaultBaseUrl)
  }

  const handleToggleApiLocalDeployed = () => {
    handleToggleApiLocation()
    setInputValue(defaultBaseUrl)
  }

  return (
    <div id="base-url-form">
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
          onClick={() => handleSetBaseUrl(inputValue)}
        >{`Set ${isLocalApi ? 'localhost' : 'remote'} base URL`}</button>
        <button
          className={`base-url-btns ${isLocalApi ? 'local' : 'deployed'}`}
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
