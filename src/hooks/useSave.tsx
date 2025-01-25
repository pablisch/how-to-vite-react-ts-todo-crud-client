import { useContext } from 'react'
import { SaveContext } from '../context/SaveContext.tsx'

export const useSave = () => {
  const context = useContext(SaveContext)
  if (!context) {
    throw new Error('useSave must be used within an SaveProvider')
  }

  return context
}
