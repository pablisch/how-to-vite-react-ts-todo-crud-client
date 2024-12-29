import BaseUrlForm from './BaseUrlForm.tsx'
import './UrlComponents.css'
import EndpointUrlForm from './EndpointUrlForm.tsx'
import IdParamsForm from './IdParamsForm.tsx'
import QueryParamsForm from './QueryParamsForm.tsx'

const UrlComponents = () => {
  return (
    <div
      className="flex-container border-1 url-components-container"
      id="url-components-container"
    >
      <BaseUrlForm />
      <EndpointUrlForm />
      <IdParamsForm />
      <QueryParamsForm />
    </div>
  )
}

export default UrlComponents
