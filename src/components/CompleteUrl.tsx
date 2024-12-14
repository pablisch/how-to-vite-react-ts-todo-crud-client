import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import '../css/CompleteUrl.css'
import { useEndpoint } from '../hooks/useEndpoint.tsx'

const CompleteUrl = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()

  return (
    <div className="flex-container" id="complete-url-container">
      <h1 id="complete-url-title">Complete URL:</h1>
      <p id="complete-url-text">{`${baseUrl}/${endpoint}`}</p>
    </div>
  )
}

export default CompleteUrl
