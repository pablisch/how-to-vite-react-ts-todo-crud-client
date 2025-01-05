import React, { useEffect, useState } from 'react'
import { useSettings } from '../../hooks/useSettings.tsx'

interface CompleteUrlProps {
  combinedUrl: string
}

const CompleteUrl = ({ combinedUrl }: CompleteUrlProps) => {
  const [inputValue, setInputValue] = useState<string>(combinedUrl)
  const { settings } = useSettings()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(event.target.value)
    setInputValue(inputValue) // TODO nonsense placeholder line
    console.log('****()** event:', event.target.value)
    console.log('****()** settings:', JSON.stringify(settings, null, 2))
  }

  useEffect(() => {
    setInputValue(combinedUrl)
  }, [combinedUrl])

  return (
    <div className="url-form" id="complete-url-form">
      <h1 id="complete-url-title" className={`url-form-title`}>
        Complete URL:
      </h1>
      <input
        id={`complete-url-input`}
        className="url-input mono combined-input"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Complete URL string`}
      />
    </div>
  )
}

export default CompleteUrl
