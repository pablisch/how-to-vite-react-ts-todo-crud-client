import React, { useEffect, useState } from 'react'
import { useIdParams } from '../hooks/useIdParams.tsx'
import Button from './Button.tsx'

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
      <h1 id="url-id-param-title" className="url-form-title">
        URL /:id params:
      </h1>
      <input
        id="url-id-param-input"
        className="url-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Enter new URL /:id param"
      />
      <div className="url-btn-container">
        <Button
          ariaLabel="set id params url section"
          id={`set-id-params-url`}
          className={`btn url-btn`}
          // disabled={isDefaultUrlValue}
          onClick={() => handleSetIdParams(inputValue)}
        >
          {`Set /:id param`}
        </Button>
        <Button
          ariaLabel="reset id params url section"
          id={`reset-endpoint-url`}
          className={`btn url-btn`}
          // disabled={isDefaultUrlValue}
          onClick={handleResetIdParams}
        >
          {`Reset /:id param`}
        </Button>
      </div>
    </div>
  )
}

export default IdParamsForm
