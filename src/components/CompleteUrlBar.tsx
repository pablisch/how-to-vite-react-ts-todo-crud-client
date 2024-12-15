import { useBaseUrl } from '../hooks/useBaseUrl.tsx'
import '../css/CompleteUrl.css'
import { useEndpoint } from '../hooks/useEndpoint.tsx'
import { useUrlParams } from '../hooks/useUrlParams.tsx'

const CompleteUrlBar = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { params } = useUrlParams()

  return (
    <div className="flex-container" id="complete-url-container">
      <h1 id="complete-url-title">Complete URL:</h1>
      <p id="complete-url-text"><span className="base-url-text">{baseUrl}</span><span className="url-endpoint-text">{`/${endpoint}`}</span><span className="url-id-param-text">{`${params ? '/' : ''}${params}`}</span></p>
    </div>
  )
}

export default CompleteUrlBar
