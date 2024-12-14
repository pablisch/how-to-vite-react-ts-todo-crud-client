import { useContext } from 'react'
import { EndpointContext } from '../context/EndpointContext.tsx'

export const useEndpoint = () => {
  const context = useContext(EndpointContext)
  if (!context) {
    throw new Error('useEndpoint must be used within an EndpointProvider')
  }

  return context
}
