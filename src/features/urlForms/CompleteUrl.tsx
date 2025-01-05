// import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
// import { useEndpoint } from '../../hooks/useEndpoint.tsx'
// import { useIdParams } from '../../hooks/useIdParams.tsx'
// import { useQueryParams } from '../../hooks/useQueryParams.tsx'
import React, { useState } from 'react'
import { useSettings } from '../../hooks/useSettings.tsx'
// import { UnknownObject } from '../../types/types.ts'

interface CompleteUrlProps {
  combinedUrl: string
}

const CompleteUrl = ({ combinedUrl }: CompleteUrlProps) => {
  const [inputValue, setInputValue] = useState<string>(combinedUrl)
  // const { baseUrl } = useBaseUrl()
  // const { endpoint } = useEndpoint()
  // const { idParams } = useIdParams()
  // const { queryParams } = useQueryParams()
  const { settings } = useSettings()

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setInputValue(event.target.value)
    setInputValue(inputValue) // TODO nonsense placeholder line
    console.log('****()** event:', event.target.value)
    console.log('****()** settings:', JSON.stringify(settings, null, 2))
  }

  return (
    <div className="url-form" id="complete-url-form">
      <h1 id="complete-url-title" className={`url-form-title`}>
        Complete URL:
      </h1>
      <input
        id={`complete-url-input`}
        className="url-input mono"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder={`Complete URL string`}
      />
      {/*<p id="complete-url-text">*/}
      {/*  <span className="base-url-text mono">{baseUrl}</span>*/}
      {/*  <span className="url-endpoint-text mono">{endpoint}</span>*/}
      {/*  <span className="url-id-param-text mono">{idParams}</span>*/}
      {/*  <span className="url-query-param-text mono">{queryParams}</span>*/}
      {/*</p>*/}
    </div>
  )
}

export default CompleteUrl
