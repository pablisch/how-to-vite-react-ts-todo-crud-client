import BaseUrlForm from './BaseUrlForm.tsx'
import './UrlComponents.css'
import EndpointUrlForm from './EndpointUrlForm.tsx'
import IdParamsForm from './IdParamsForm.tsx'
import QueryParamsForm from './QueryParamsForm.tsx'
// import CompleteUrl from './CompleteUrl.tsx'
import { useBaseUrl } from '../../hooks/useBaseUrl.tsx'
import { useEndpoint } from '../../hooks/useEndpoint.tsx'
import { useIdParams } from '../../hooks/useIdParams.tsx'
import { useQueryParams } from '../../hooks/useQueryParams.tsx'
import CombinedUrl from './CombinedUrl.tsx'
import { useEffect, useState } from 'react'

const UrlComponents = () => {
  const { baseUrl } = useBaseUrl()
  const { endpoint } = useEndpoint()
  const { idParams } = useIdParams()
  const { queryParams } = useQueryParams()
  const [url, setUrl] = useState<string>(
    `${baseUrl}${endpoint}${idParams}${queryParams}`
  )
  console.log('combinedUrl:', url)

  useEffect(() => {
    setUrl(`${baseUrl}${endpoint}${idParams}${queryParams}`)
  }, [baseUrl, endpoint, idParams, queryParams])

  return (
    <div
      className="flex-container url-components-container"
      id="url-components-container"
    >
      {/*<CompleteUrl combinedUrl={url} />*/}
      <CombinedUrl />
      <BaseUrlForm />
      <EndpointUrlForm />
      <IdParamsForm />
      <QueryParamsForm />
    </div>
  )
}

export default UrlComponents
