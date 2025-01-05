import BaseUrlForm from './BaseUrlForm.tsx'
import './UrlComponents.css'
import EndpointUrlForm from './EndpointUrlForm.tsx'
import IdParamsForm from './IdParamsForm.tsx'
import QueryParamsForm from './QueryParamsForm.tsx'
import CompleteUrl from './CompleteUrl.tsx'
import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useQueryParams } from '../../hooks/useQueryParams.tsx'

const UrlComponents = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  const combinedUrl = `${baseUrl}${endpoint}${idParams}${queryParams}`
  console.log('combinedUrl:', combinedUrl)

  return (
    <div
      className="flex-container url-components-container"
      id="url-components-container"
    >
      <CompleteUrl combinedUrl={combinedUrl} />
      <BaseUrlForm />
      <EndpointUrlForm />
      <IdParamsForm />
      <QueryParamsForm />
    </div>
  )
}

export default UrlComponents
