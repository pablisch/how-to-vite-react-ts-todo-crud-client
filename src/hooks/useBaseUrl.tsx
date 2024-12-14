import { useContext } from 'react'
import {
  BaseUrlContext,
  BaseUrlContextType,
} from '../context/baseUrlContext.tsx'

export const useBaseUrl = (): BaseUrlContextType => {
  const context = useContext(BaseUrlContext)
  if (!context) {
    throw new Error('useBaseUrl must be used within a BaseUrlProvider')
  }

  return context
}
