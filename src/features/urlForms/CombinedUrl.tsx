import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useQueryParams } from '../../hooks/useQueryParams.tsx'
import React, { useEffect, useState } from 'react'
import { useSettings } from '../../hooks/useSettings.tsx'

const CombinedUrl = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  const { settings } = useSettings()
  const combinedValue = `${baseUrl}${endpoint}${idParams}${queryParams}`
  const [inputValue, setInputValue] = useState<string>(combinedValue)


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(event.target.value)
    setInputValue(inputValue) // TODO nonsense placeholder line
    console.log('****()** event:', event.target.value)
    console.log('****()** settings:', JSON.stringify(settings, null, 2))
  }

  useEffect(() => {
    setInputValue(combinedValue)
  }, [combinedValue])

  return (
    <div className="url-form" id="combined-url-form">
      <h1 id="complete-url-title" className={`url-form-title`}>
        Combined URL:
      </h1>
      {/* styled overlay */}
      <div className={`url-overlay-container combined-input`}>
        <div
          className={`url-overlay`}
        >
          <span className="base-url-text mono space-left-18">{baseUrl}</span>
          <span className="url-endpoint-text mono">{endpoint}</span>
          <span className="url-id-param-text mono">{idParams}</span>
          <span className="url-query-param-text mono">{queryParams}</span>
        </div>
        {/* hidden input element */}
        <input
          type="text"
          className="url-input mono combined-input hidden-input-element"
          value={combinedValue}
          onChange={handleInputChange}
        />
      </div>
    </div>
  )
}

export default CombinedUrl
