import { useContext } from 'react'
import { OperationContext } from '../context/OperationContext.tsx'

export const useOperation = () => {
  const context = useContext(OperationContext)
  if (!context) {
    throw new Error('useOperation must be used with an OperationContext')
  }

  return context
}
