import React, { createContext, useEffect, useState } from 'react'

const defaultEndpoint: string = '/todos'
const initialEndpoint: string =
  localStorage.getItem('endpoint') || defaultEndpoint

export interface EndpointContextType {
  endpoint: string
  handleSetEndpoint: (newEndpoint: string) => void
  handleResetEndpoint: () => void
  isDefaultUrlValue: boolean
}

export const EndpointContext = createContext<EndpointContextType>({
  endpoint: initialEndpoint,
  handleSetEndpoint: () => {},
  handleResetEndpoint: () => {},
  isDefaultUrlValue: initialEndpoint === defaultEndpoint,
})

export const EndpointProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [endpoint, setEndpoint] = useState<string>(initialEndpoint)
  const [isDefaultUrlValue, setIsDefaultUrlValue] = useState<boolean>(
    initialEndpoint === defaultEndpoint
  )

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

  useEffect(() => {
    if (endpoint === defaultEndpoint && !isDefaultUrlValue) {
      setIsDefaultUrlValue(true)
    } else if (endpoint !== defaultEndpoint && isDefaultUrlValue) {
      setIsDefaultUrlValue(false)
    }
  }, [endpoint])

  return (
    <EndpointContext.Provider
      value={{
        endpoint,
        handleSetEndpoint,
        handleResetEndpoint,
        isDefaultUrlValue,
      }}
    >
      {children}
    </EndpointContext.Provider>
  )
}
