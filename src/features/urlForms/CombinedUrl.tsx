import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useQueryParams } from '../../hooks/useQueryParams.tsx'
import React, { useEffect, useState } from 'react'
import { useSettings } from '../../hooks/useSettings.tsx'
import '../../fonts.css'

const CombinedUrl = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  const { settings } = useSettings()
  const combinedValue = `${baseUrl}${endpoint}${idParams}${queryParams}`
  const [inputValue, setInputValue] = useState<string>(combinedValue)
  const [nonsense, setNonsense] = useState<string>('') // TODO nonsense placeholder line to avoid errors

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNonsense(event.target.value || nonsense) // TODO nonsense placeholder line to avoid errors
    setInputValue(inputValue) // TODO nonsense placeholder line to avoid errors
    console.log(
      '****()** - AVOID ERRORS - settings:',
      JSON.stringify(settings, null, 2)
    )
  }

  useEffect(() => {
    setInputValue(combinedValue)
  }, [combinedValue])

  return (
    <div className="url-form" id="combined-url-form">
      <div className="form-title-wrapper">
        <h1 id="complete-url-title" className={`url-form-title`}>
          Combined URL:
        </h1>
      </div>
      {/* styled overlay */}
      <div className="form-input-wrapper flex-container">
        <div className={`url-overlay-container combined-input`}>
          <div className={`url-overlay`}>
            <span className="base-url-text url-input-text space-left-18 url-segment">
              {baseUrl}
            </span>
            <span className="url-endpoint-text url-input-text url-segment">
              {endpoint}
            </span>
            <span className="url-id-param-text url-input-text url-segment">
              {idParams}
            </span>
            <span className="url-query-param-text url-input-text url-segment">
              {queryParams}
            </span>
          </div>
          {/* hidden input element */}
          <input
            id="hidden-combined-url-input"
            type="text"
            className="url-input url-input-text combined-input hidden-input-element"
            value={combinedValue}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </div>
  )
}

export default CombinedUrl
