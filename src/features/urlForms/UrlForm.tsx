import React, { useEffect, useState } from 'react'
import Button from '../../components/Button.tsx'
import { useSettings } from '../../hooks/useSettings.tsx'

interface UrlFormProps {
  id: string
  title: string
  placeholder: string
  defaultUrlValue: string
  isDefaultUrlValue: boolean
  onSetUrl: (value: string) => void
  onResetUrl: () => void
  setUrlBtnText: string
  resetUrlBtnText: string
  additionalButtons?: Array<{
    text: string
    onClick: () => void
    className?: string
    id: string
    ariaLabel?: string
  }>
}

const UrlForm: React.FC<UrlFormProps> = ({
  id = '',
  title,
  placeholder,
  defaultUrlValue,
  isDefaultUrlValue,
  onSetUrl,
  onResetUrl,
  setUrlBtnText,
  resetUrlBtnText,
  additionalButtons = [],
}) => {
  const [inputValue, setInputValue] = useState(defaultUrlValue)

  const { settings } = useSettings()

  const setUrlDisabled: boolean = inputValue === defaultUrlValue

  useEffect(() => {
    setInputValue(defaultUrlValue)
  }, [defaultUrlValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    console.log(
      '****()** - AVOID ERRORS - settings:',
      JSON.stringify(settings, null, 2)
    )
  }

  useEffect(() => {
    if (settings.setUrlOnChange) {
      onSetUrl(inputValue)
    }
  }, [inputValue])

  return (
    <div id={`${id}-form`} className="url-form">
      <div className="form-title-wrapper">
        <h1 id={`${id}-title`} className="url-form-title">
          {title}
        </h1>
      </div>
      <div className="form-input-wrapper flex-container">
        <input
          id={`${id}-input`}
          className="url-input mono"
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        <div className="url-btn-container">
          {!settings.setUrlOnChange && (
            <Button
              ariaLabel={`set ${id}`}
              id={`set-${id}-btn`}
              onClick={() => onSetUrl(inputValue)}
              className={`btn url-btn ${setUrlDisabled ? 'disabled' : ''}`}
              disabled={setUrlDisabled}
            >
              {setUrlBtnText}
            </Button>
          )}
          <Button
            ariaLabel={`reset ${id}`}
            id={`reset-${id}-btn`}
            onClick={onResetUrl}
            className={`btn url-btn ${isDefaultUrlValue ? 'disabled' : ''}`}
            disabled={isDefaultUrlValue}
          >
            {resetUrlBtnText}
          </Button>
          {additionalButtons.map((button, index) => (
            <Button
              key={index}
              ariaLabel={button.ariaLabel}
              id={button.id}
              onClick={button.onClick}
              className={button.className || 'btn url-btn'}
            >
              {button.text}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UrlForm
