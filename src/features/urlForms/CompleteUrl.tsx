import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import './CompleteUrl.css'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useQueryParams } from '../../hooks/useQueryParams.tsx'

const CompleteUrl = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()

  return (
    <div className="flex-container border-primary" id="complete-url-container">
      <h1 id="complete-url-title">Complete URL:</h1>
      <p id="complete-url-text">
        <span className="base-url-text">{baseUrl}</span>
        <span className="url-endpoint-text">{endpoint}</span>
        <span className="url-id-param-text">{idParams}</span>
        <span className="url-query-param-text">{queryParams}</span>
      </p>
    </div>
  )
}

export default CompleteUrl
