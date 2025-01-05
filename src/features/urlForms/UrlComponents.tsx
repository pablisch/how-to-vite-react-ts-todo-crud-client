import BaseUrlForm from './BaseUrlForm.tsx'
import './UrlComponents.css'
import EndpointUrlForm from './EndpointUrlForm.tsx'
import IdParamsForm from './IdParamsForm.tsx'
import QueryParamsForm from './QueryParamsForm.tsx'
import CompleteUrl from './CompleteUrl.tsx'

const UrlComponents = () => {
  return (
    <div
      className="flex-container url-components-container"
      id="url-components-container"
    >
      <CompleteUrl />
      <BaseUrlForm />
      <EndpointUrlForm />
      <IdParamsForm />
      <QueryParamsForm />
    </div>
  )
}

export default UrlComponents
