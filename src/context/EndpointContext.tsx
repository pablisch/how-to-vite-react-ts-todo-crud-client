import React, { createContext, useState } from 'react'
import { defaultUrls } from '../utils/data.ts'

const defaultEndpoint: string = defaultUrls.endpoint
const initialEndpoint: string =
  localStorage.getItem('endpoint') || defaultEndpoint

export interface EndpointContextType {
  endpoint: string
  handleSetEndpoint: (newEndpoint: string) => void
  handleResetEndpoint: () => void
}

export const EndpointContext = createContext<EndpointContextType>({
  endpoint: initialEndpoint,
  handleSetEndpoint: () => {},
  handleResetEndpoint: () => {},
})

export const EndpointProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [endpoint, setEndpoint] = useState<string>(initialEndpoint)

  const handleSetEndpoint = (newEndpoint: string) => {
    if (!newEndpoint) return
    newEndpoint = newEndpoint.startsWith('/') ? newEndpoint : `/${newEndpoint}`
    setEndpoint(newEndpoint)
    if (newEndpoint == defaultEndpoint) {
      localStorage.removeItem('endpoint')
    } else {
      localStorage.setItem('endpoint', newEndpoint)
    }
  }

  const handleResetEndpoint = () => {
    setEndpoint(defaultEndpoint)
    localStorage.removeItem('endpoint')
  }

  return (
    <EndpointContext.Provider
      value={{
        endpoint,
        handleSetEndpoint,
        handleResetEndpoint,
      }}
    >
      {children}
    </EndpointContext.Provider>
  )
}
