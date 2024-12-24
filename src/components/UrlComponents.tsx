// import React from 'react'
import BaseUrlForm from './BaseUrlForm.tsx'
import EndpointForm from './EndpointForm.tsx'
import IdParamsForm from './IdParamsForm.tsx'
import QueryParamsForm from './QueryParamsForm.tsx'
import '../css/UrlComponents.css'

const UrlComponents = () => {
  return (
    <div className="flex-container border-1 url-components-container" id="url-components-container">
      <BaseUrlForm />
      <EndpointForm />
      <IdParamsForm />
      <QueryParamsForm />
    </div>
  )
}

export default UrlComponents
