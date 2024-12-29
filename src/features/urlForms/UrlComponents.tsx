// import React from 'react'
import BaseUrlForm from './BaseUrlForm.tsx'
import QueryParamsFormOld from './QueryParamsFormOld.tsx'
import './UrlComponents.css'
import EndpointUrlForm from './EndpointUrlForm.tsx'
import IdParamsForm from './IdParamsForm.tsx'

const UrlComponents = () => {
  return (
    <div
      className="flex-container border-1 url-components-container"
      id="url-components-container"
    >
      <BaseUrlForm />
      <EndpointUrlForm />
      <IdParamsForm />
      <QueryParamsFormOld />
    </div>
  )
}

export default UrlComponents
