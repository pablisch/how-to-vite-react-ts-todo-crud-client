import React, { useEffect, useState } from 'react'
import Button from './Button.tsx'
import { useSettings } from '../hooks/useSettings.tsx'

interface UrlFormProps {
  id: string
  title: string
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSetUrl: (value: string) => void
  onResetUrl: () => void
  setUrlButtonText: string
  resetUrlButtonText: string
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
  value,
  onChange,
  onSetUrl,
  onResetUrl,
  setUrlButtonText,
  resetUrlButtonText,
  additionalButtons = [],
}) => {
  const [inputValue, setInputValue] = useState(value)

  const { settings } = useSettings()

  useEffect(() => {
    setInputValue(value)
  }, [value])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    console.log('****()** settings:', JSON.stringify(settings, null, 2))
  }

  // const handleInputOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // if (settings.setUrlOnChange) {
  //     setInputValue(event.target.value)
  //     // onChange(event.target.value)
  //   // }
  // }
  useEffect(() => {
    if (settings.setUrlOnChange) {
      onSetUrl(inputValue)
    }
  }, [inputValue])

  return (
    <div id={`${id}-form`} className="url-form">
      <h1 id={`${id}-title`} className="url-form-title">
        {title}
      </h1>
      <input
        id={`${id}-input`}
        className="url-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
      <div className="url-btn-container">
        <Button
          ariaLabel={`set ${id}`}
          id={`set-${id}-btn`}
          onClick={() => onSetUrl(inputValue)}
          className="btn url-btn"
        >
          {setUrlButtonText}
        </Button>
        <Button
          ariaLabel={`reset ${id}`}
          id={`reset-${id}-btn`}
          onClick={onResetUrl}
          className="btn url-btn"
        >
          {resetUrlButtonText}
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
  )
}

export default UrlForm
